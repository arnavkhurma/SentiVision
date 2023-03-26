import cv2
import datetime

# create video capture object
data = cv2.VideoCapture(
    r'C:\Users\Kesavasai Virinchi\Pictures\Camera Roll\WIN_20230314_11_40_53_Pro.mp4')

# count the number of frames
frames = data.get(cv2.CAP_PROP_FRAME_COUNT)
fps = data.get(cv2.CAP_PROP_FPS)

# calculate duration of the video
seconds = round(frames / fps)
video_time = datetime.timedelta(seconds=seconds)
print(f"duration in seconds: {seconds}")

times = []

for i in range(0, seconds+1):
    i = i % (24 * 3600)
    hour = i // 3600
    i %= 3600
    minutes = i // 60
    i %= 60
    times.append("%d:%02d:%02d" % (hour, minutes, i))

print(times)
