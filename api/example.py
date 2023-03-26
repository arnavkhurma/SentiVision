
def sample_function(video_filename):
    csv_filename = "sentivision_data.csv"
    f = open(csv_filename, "a")
    f.write("Current Time,Beginning of Time Interval,Anger,Disgust (video),Fear (video),Happy (video),Sad (video),Surprise (video),Neutral (video),Video Emotion Vector (3 elements),,,Text Emotion Vector (3 elements),,,Cosine similarity in R3,Final Classification")
    f.write("0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null")
    f.write("0.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null")
    f.write("18,8,0.4862941214,0.7936623079,0.230248866,0.06517540822,0.62451141,0.6821570136,0.7495423436,0.9371364252,0.09774057619,0.7148216605,0.3169088451,0.1054079366,0.7401018249,0.8709012979,Genuine")
    f.write("18.25,8.25,0.7686432426,0.7456667293,0.9124325102,0.5309985326,0.1366120238,0.3321321279,0.8987693203,0.3391678833,0.3701540555,0.967260552,0.7611296875,0.04815659166,0.2005618936,0.5468670723,Ingenuine")
    f.close()
    return csv_filename
