// Importing React and necessary components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import CardOverlay from './CardOverlay';
import FileUpload from './FileUpload';

// VideoPlayerCard component to conditionally render the FileUpload or VideoPlayer
function VideoPlayerCard(props) {
  // State to control the display of FileUpload or VideoPlayer
  const [displayConditional, setDisplayConditional] = useState(true);

  // Function to handle data retrieval from FileUpload component
  const pull_data = data => {
    console.log('Video Player Card: ' + data);
    props.func(data); // Passing data up to the parent component
  };

  // Function to handle MOV file path retrieval from FileUpload component
  const pull_MOV_path = data => {
    console.log('MOV path: ' + data);
    props.func2(data); // Passing MOV path up to the parent component
  };

  // Conditional rendering based on displayConditional state
  return displayConditional ? (
    // Render CardOverlay with FileUpload component as a child
    <CardOverlay
      render={
        <FileUpload
          func={pull_data} // Function to handle data
          func2={pull_MOV_path} // Function to handle MOV path
          condition={props.condition} // Condition passed to FileUpload
          width={400} // Width for the FileUpload component
          height={300} // Height for the FileUpload component
          style={{ borderTopLeftRadius: '26px' }} // Additional styling
        />
      }
    />
  ) : (
    // Render VideoPlayer component
    <VideoPlayer
      outputFile={props.outputFile} // The file to be played
      autoplayControl={true} // Control for autoplay feature
      condition={props.condition} // Condition passed to VideoPlayer
    />
  );
}

// Exporting the VideoPlayerCard component
export default VideoPlayerCard;
