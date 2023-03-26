import csv
from flask import Flask, request
import os
import string
import random
import json


app = Flask(__name__)
STATIC_DIR = 'public/videos'
set FLASK_APP=app.py


def generate_filename():
    return ''.join(random.choices(string.ascii_lowercase, k=20)) + '.mp4'


@app.route("/", methods=["POST"])
def home():

    # vectors = []
    video = request.files['video']
    absolute_path = os.path.abspath(
        "../React Projects/video-player/"+STATIC_DIR+"/"+generate_filename())
    print(absolute_path)
    video.save(absolute_path)

    # ML stuff

    """
    with open('LinearData.csv', mode='r')as file:
        csvFile = csv.reader(file)
        for lines in csvFile:
            vectors.append(lines)
    """

    return json.dumps({"file_path": absolute_path})


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)
