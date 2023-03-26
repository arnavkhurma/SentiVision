import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = (props) => {
  return (
    <div className="video-container" style={{ margin: '30px' , borderRadius: '100px' , borderBlockColor: 'black', overflow: 'static', position: 'static' }}>
      <video
        className="video"
        width="100%"
        height="100%"
        marginRight='300px'
        controls
        autoPlay
        muted
        style={{marginTop: '-56px', marginRight: '300px', marginBottom: '5000px' }}
      >
        <source src={props.videoName.split("\\")[7]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
