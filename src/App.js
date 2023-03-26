import React from 'react';
import VideoPlayerCard from './components/VideoPlayerCard'
import Header from './components/Header'
import DataComponent from './components/DataComponent'
import VideoTranscript from './components/VideoTranscript'

const App = () => {
  const dataStyles = {
    videoOverlay: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1350px',
      margin: '0 auto'
    }
  }

  return (
    <>
      <div className='App'>
        <Header logoName='Sentivision' />
        <br />
        <>
          <div className='videoOverlay' style={dataStyles.videoOverlay}>
            <div>
              <VideoPlayerCard />
              <VideoTranscript text='Video Transcript' />
            </div>
            <div>
              <DataComponent />
            </div>
          </div>
        </>
        <br />
      </div>
    </>
  )
}

export default App
