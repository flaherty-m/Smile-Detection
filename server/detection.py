import cv2
import os
from datetime import datetime
from .models import save_detection_event

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')

def capture_and_detect():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Camera is not accessible. Please check if it is connected or permissions are granted.")
        return None, None
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return None, None

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    coords = []
    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        smiles = smile_cascade.detectMultiScale(face_roi, scaleFactor=1.63, minNeighbors=41, minSize=(35, 35))
        
        # If multiple smiles are detected, choose the one with the largest area
        if len(smiles) > 0:
            best_smile = max(smiles, key=lambda r: r[2] * r[3])
            sx, sy, sw, sh = best_smile
            cv2.rectangle(frame, (x + sx, y + sy), (x + sx + sw, y + sy + sh), (0, 255, 0), 2)
            coords.append({'x': int(x + sx), 'y': int(y + sy), 'w': int(sw), 'h': int(sh)})

    if coords:
        filename = f"smile_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
        static_dir = os.path.join(os.path.dirname(__file__), "static")
        os.makedirs(static_dir, exist_ok=True)
        path = os.path.join(static_dir, filename)
        cv2.imwrite(path, frame)
        save_detection_event(filename, coords)
        return filename, coords

    return None, None
