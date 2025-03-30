import React from "react";

const VideoFeed: React.FC = () => {
  return (
    <div>
      <h3>Live Video Feed</h3>
      <img
        src="/video_feed"
        alt="Live Video Feed"
        className="img-fluid"
        style={{ maxWidth: "640px" }}
      />
    </div>
  );
};

export default VideoFeed;
