from flask import Flask, request
import os
import json
from flask_cors import CORS
import cv2 as cv
from deepface import DeepFace
from moviepy.editor import *
from pydub import AudioSegment
import speech_recognition as sr
import datetime
from datetime import datetime
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import random
import math


app = Flask(__name__)
STATIC_DIR = 'public/videos'
cors = CORS(app)


@app.route("/", methods=["POST"])
def home():
    video = request.files['video']
    absolute_path = os.path.abspath(
        "../hoohacks-sentivision/public/videos/"+video.filename)
    print(absolute_path)
    video.save(absolute_path)
    absolute_path_video = full_compute(absolute_path)
    print(absolute_path_video)
    return json.dumps({"file_path": absolute_path, "finalOut": "Sentivision.csv", "csv_filename": absolute_path_video})


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)


def full_compute(video_filename):
    # sets up variables for the video
    print(video_filename)
    video = cv.VideoCapture(video_filename)
    real_fps = video.get(cv.CAP_PROP_FPS)
    fps = round(real_fps)
    total_frames = video.get(cv.CAP_PROP_FRAME_COUNT)
    deltat = 0.5  # length of time step
    deltat_in_frames = deltat * fps

    # records total length of video
    total_seconds = total_frames / fps
    minutes = total_seconds // 60
    seconds = total_seconds - minutes

    # extracts audio
    moviepy_video = VideoFileClip(video_filename)
    now_string = datetime.now().strftime("%m-%d-%Y_%Hh%Mm%Ss")
    listSplit = video_filename.split('\\')
    listSplitName = (listSplit[-1].split(".")[0])
    audio_folder_name = f"[audio_files]_{listSplitName}_{now_string}"
    print(audio_folder_name)
    os.makedirs(audio_folder_name)
    audio_filename = f"./{audio_folder_name}/{listSplitName}.wav"
    moviepy_video.audio.write_audiofile(audio_filename)

    # other preparation
    time_interval_for_text = 10  # in seconds
    # nltk.download("vader_lexicon")
    sia_nlp_model = SentimentIntensityAnalyzer()
    output_data_filename = "C:/Users/Kesavasai Virinchi/Desktop/cloned-stuff/sentivision/hoohacks-sentivision/public/videos/{listSplitName}.csv".format(
        listSplitName=listSplitName)
    print("Hello World: " + output_data_filename)
    output_data_file = open(output_data_filename, "w")

    final_csv_string = "Current Time,Beginning of Time Interval,Anger (video),Disgust (video),Fear (video),Happy (video),Sad (video),Surprise (video),Neutral (video),Video Emotion Vector (positive),(neutral),(negative),Text Emotion Vector (positive),(neutral),(negative),Cosine similarity,Final Sincerity Classification,Transcription Over Time Interval"
    i = 0
    while i < total_frames:
        current_time = round(i / fps, 2)

        # adding the 5 frames is for having a safety net (making sure
        # only intervals that absolutely end after 10 seconds in are
        # clipped from the audio)
        if i < fps * time_interval_for_text + 5:
            row_string = ",null" * 17
            row_string = "\n" + str(current_time) + row_string
            # final_csv_string += row_string
            # print(row_string)
            output_data_file.write(row_string)
            i += int(deltat_in_frames)
            continue

        # reads current frame and estimates emotion
        video.set(cv.CAP_PROP_POS_FRAMES, i)
        _, frame = video.read()
        video_emotion_output = DeepFace.analyze(
            img_path=frame, actions=["emotion"])
        anger = video_emotion_output[0]["emotion"]["angry"]
        disgust = video_emotion_output[0]["emotion"]["disgust"]
        fear = video_emotion_output[0]["emotion"]["fear"]
        happiness = video_emotion_output[0]["emotion"]["happy"]
        sadness = video_emotion_output[0]["emotion"]["sad"]
        surprise = video_emotion_output[0]["emotion"]["surprise"]
        neutral = video_emotion_output[0]["emotion"]["neutral"]

        cumulative_positive = happiness / 100.0
        cumulative_neutral = (neutral + surprise) / 100.0
        cumulative_negative = (sadness + anger + disgust + fear) / 100.0
        video_emotion_vector = [cumulative_positive,
                                cumulative_neutral, cumulative_negative]
        # standardized to add to 1

        # reads last 10 seconds audio clip
        i_in_ms = int(i / fps * 1000)
        clip = AudioSegment.from_wav(audio_filename)[
            i_in_ms-(time_interval_for_text*1000):i_in_ms]
        clip_filename = f"./{audio_folder_name}/{i_in_ms}ms_({listSplitName}).wav"
        clip.export(out_f=clip_filename, format="wav")

        # # transcribes clip
        # keep in mind, this can be massively sped up by transcribing the entire audio
        # at once--using timestamps for each word--and then using a sliding window algorithm
        # to get a window of text at each time point in the loop
        # but for now, the text_from_clip variable can just hold the text (through an
        # inefficient method)
        transcriber = sr.Recognizer()
        with sr.AudioFile(clip_filename) as source:
            audio = transcriber.record(source)
            transcription_output = transcriber.recognize_google(
                audio, language='en-US', show_all=True)
            text_from_clip = transcription_output["alternative"][0]["transcript"]
            confidence_in_stt = transcription_output["alternative"][0]["confidence"]
            # number, but in a string

        # obtains the sentiment vector from the text clip
        text_emotion_output = sia_nlp_model.polarity_scores(text_from_clip)
        text_emotion_vector = [text_emotion_output["pos"],
                               text_emotion_output["neu"], text_emotion_output["neg"]]

        # does the final classification of genuineness
        cos_theta = cosine_similarity(
            video_emotion_vector, text_emotion_vector)
        classification = "Genuine" if (cos_theta >= 0.5) else "Ingenuine"

        i += int(deltat_in_frames)
        row_string = f"\n{current_time},{current_time - time_interval_for_text},{anger}," + \
            f"{disgust},{fear},{happiness},{sadness},{surprise},{neutral}," + \
            f"{video_emotion_vector[0]},{video_emotion_vector[1]},{video_emotion_vector[2]}," + \
            f"{text_emotion_vector[0]},{text_emotion_vector[1]},{text_emotion_vector[2]}," + \
            f"{cos_theta},{classification},{text_from_clip}"
        # final_csv_string += row_string
        print(row_string)
        output_data_file.write(row_string)

    # cv.waitKey(0)
    # output_data_filename = video_filename + ".csv"
    # output_data_file = open(output_data_filename, "w")
    # output_data_file.write(final_csv_string)
    output_data_file.close()
    print(output_data_filename)
    return output_data_filename


def cosine_similarity(v1, v2):
    dot = v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2]
    magA = math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] + v1[2]*v1[2])
    magB = math.sqrt(v2[0]*v2[0] + v2[1]*v2[1] + v2[2]*v2[2])
    cos_theta = dot / (magA * magB)
    return cos_theta

# basically, i just made this function to calculate an approximation for the mean and standard
# deviation of the distribution of cosine similarities between two vectors, where the two vectors
# have all their components add to 1 and are restricted to the first octant (as all the elements
# are positive)


def mean_and_sd():
    sum_for_mean = 0
    n = 100000
    dataset = []
    for i in range(n):
        a1 = random.random()
        remainder = 1 - a1
        a2 = random.random()
        while a2 > remainder:
            a2 = random.random()
        a3 = 1 - a1 - a2
        a = [a1, a2, a3]

        b1 = random.random()
        remainder = 1 - b1
        b2 = random.random()
        while b2 > remainder:
            b2 = random.random()
        b3 = 1 - b1 - b2
        b = [b1, b2, b3]

        cos_theta = cosine_similarity(a, b)
        sum_for_mean += cos_theta
        dataset.append(cos_theta)
        print(f"completed loop {i} for mu")
    mean = sum_for_mean / n

    sum_for_sd = 0
    for i in range(n):
        sum_for_sd += (dataset[i] - mean) ** 2
        print(f"completed loop {i} for sigma")
    variance = sum_for_sd / (n-1)
    sd = math.sqrt(variance)

    return (mean, sd)
