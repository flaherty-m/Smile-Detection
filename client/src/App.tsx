import React, { useState, useEffect } from "react";
import VideoFeed from "./VideoFeed";
import SmileViewer from "./SmileViewer";
import { SmileData } from "./types";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [smileData, setSmileData] = useState<SmileData | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCapturing) {
      interval = setInterval(() => {
        fetch("/api/smile")
          .then((res) => res.json())
          .then((data: SmileData) => {
            if (!("error" in data)) {
              setSmileData(data);
              setIsCapturing(false); // If a smile is detected, stop capturing
            }
          })
          .catch((err) => console.error("Error fetching smile data:", err));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Smile Detector App</h1>
      <div className="text-center mb-3">
      <button
        className={`btn ${isCapturing ? "btn-danger" : "btn-primary"}`}
        onClick={() => setIsCapturing(!isCapturing)}
      >
        {isCapturing ? "Stop Capturing" : "Start Capturing"}
      </button>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <VideoFeed />
        </div>
        <div className="col-md-6">
          <SmileViewer image={smileData?.image} coords={smileData?.coordinates} />
        </div>
      </div>
    </div>
  );
}

export default App;
