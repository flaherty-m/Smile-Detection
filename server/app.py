from flask import Flask, jsonify, Response, send_file
from flask_cors import CORS
from .detection import capture_and_detect
from .models import init_db
import os
import cv2

app = Flask(__name__, static_folder="static")
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
app.config["DEBUG"] = True

init_db()

@app.route('/api/smile', methods=['GET'])
def get_smile():
    filename, coords = capture_and_detect()
    if filename:
        return jsonify({
            "image": f"/api/image/{filename}",
            "coordinates": coords
        })
    else:
        return jsonify({"error": "No smile detected"}), 404

@app.route('/api/image/<filename>', methods=['GET'])
def get_image(filename):
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    path = os.path.join(static_dir, filename)
    return send_file(path, mimetype='image/jpeg')

camera = cv2.VideoCapture(0)

def gen_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)