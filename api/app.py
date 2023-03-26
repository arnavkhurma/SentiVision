from flask import Flask, request
import os
import string
import random
import json
from flask_cors import CORS
import example # changed later

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
    csv_filename = example.sample_function(absolute_path) #changed later

    return json.dumps({"file_path": absolute_path, "finalOut": "Sentivision.csv", "csv_filename": csv_filename})


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)
