import React from 'react'
import Header from './Header'
import VideoPlayer from './VideoPlayer'
import DataComponent from './DataComponent'
import VideoTranscript from './VideoTranscript'
import ButtonComponent from './ButtonComponent'

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
      <div className="App">
        <Header logoName="Sentivision" />
          <br />
          <>
            <div className = 'videoOverlay' style={dataStyles.videoOverlay}>
              <div>
                <VideoPlayer />
                <VideoTranscript text = 'Video Transcript' />
              </div>
              <div>
                <DataComponent />
                <ButtonComponent />
              </div>
            </div>
          </>
          <br />
      </div>
    </>
  )
}

export default App
