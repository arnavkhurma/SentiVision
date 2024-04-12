// Importing React hooks from 'react' and VideoPlayer styles
import { React, useEffect, useRef } from 'react';
import './VideoPlayer.css';

// VideoPlayer functional component for playing videos
const VideoPlayer = props => {
  // Extracting the file name from the outputFile prop
  const pathArray = props.outputFile.split('/');
  const fileName = pathArray.pop();

  // Creating a ref for the video element
  const videoRef = useRef(null);

  // Effect hook to play the video when autoplayControl prop is true
  useEffect(() => {
    if (props.autoplayControl) {
      videoRef.current.play();
    }
  }, [props.autoplayControl]);

  // Render method returning JSX
  return (
    <div
      className='video-container'
      style={{
        margin: '30px',
        borderRadius: '100px', // Circular border radius for the container
        borderBlockColor: 'black', // Border color
        overflow: 'hidden', // Adjust overflow to hide
        position: 'relative' // Adjust position to relative
      }}
    >
      {/* Video element with reference and conditional controls */}
      <video
        className='video'
        ref={videoRef}
        width='100%'
        height='100%'
        muted // Mute the video by default
        controls={!props.condition} // Show controls based on condition
        autoPlay={props.condition} // Autoplay based on condition
        style={{
          marginTop: '-56px', // Adjust margin to align with the design
          marginRight: '0px', // Remove right margin
          marginBottom: '0px' // Remove bottom margin
        }}
      >
        {/* Source element for the video specifying the file path and type */}
        <source src={`/videos/${fileName}`} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Exporting the VideoPlayer component
export default VideoPlayer;
