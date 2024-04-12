// Importing necessary modules from React and components
import React, { useState, useEffect } from 'react';
import VideoPlayerCard from './components/VideoPlayerCard';
import Header from './components/Header';
import DataComponent from './components/DataComponent';
import VideoTranscript from './components/VideoTranscript';

// Main App component
const App = () => {
  // State hooks for various data and flags
  const [outputCsv, setOutputCsv] = useState(null);
  const [outputMOV, setOutputMOV] = useState(null);
  const [videoTranscript, setVideoTranscript] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [counter, setCounter] = useState(0);

  // Function to update CSV data state and set data loaded flag
  const pullData = data => {
    setOutputCsv(data);
    setDataLoaded(true);
  };

  // Function to update MOV path state and log it
  const pullMOVPath = data => {
    setOutputMOV(data);
    console.log('MOV path: ' + outputMOV);
  };

  // Function to update video transcript state based on certain conditions
  const pullVideoTranscript = data => {
    if (data !== 'null\r') {
      setCounter(counter => counter + 1);
      if (counter % 4 === 0) {
        setVideoTranscript(data);
        console.log(videoTranscript);
      }
    }
  };

  // Effect hook to log CSV data when it changes
  useEffect(() => {
    console.log('CSV in parent component: ' + outputCsv);
  }, [outputCsv]);

  // Effect hook to log when data is loaded
  useEffect(() => {
    console.log('Data loaded: ' + dataLoaded);
  }, [dataLoaded]);

  // Styles for the video overlay component
  const dataStyles = {
    videoOverlay: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1350px',
      margin: '0 auto',
    },
  };

  // Render method returning JSX
  return (
    <>
      <div className='App'>
        <Header logoName='Sentivision' />
        <br />
        <div className='videoOverlay' style={dataStyles.videoOverlay}>
          <div>
            <VideoPlayerCard
              func={pullData}
              func2={pullMOVPath}
              handleSubmission={setOutputCsv}
              text={videoTranscript}
              outputFile={outputCsv}
              condition={dataLoaded}
            />
            <VideoTranscript text={videoTranscript} />
          </div>
          <div>
            <DataComponent
              outputFile={outputCsv}
              condition={dataLoaded}
              videoData={pullVideoTranscript}
            />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

// Exporting the App component
export default App;