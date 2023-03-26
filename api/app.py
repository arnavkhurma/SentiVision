from flask import Flask, request
import os
import string
import random
import json
from flask_cors import CORS

app = Flask(__name__)
STATIC_DIR = 'public/videos'
cors = CORS(app)



@app.route("/", methods=["POST"])
def home():
    video = request.files['video']
    absolute_path = os.path.abspath(
        "../hoohacks-sentivision/public/videos"+"/"+video.filename)
    print(absolute_path)
    video.save(absolute_path)

    return json.dumps({"file_path": absolute_path})


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)
