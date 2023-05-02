import React, { useState, useEffect } from 'react'
import VideoPlayerCard from './components/VideoPlayerCard'
import Header from './components/Header'
import DataComponent from './components/DataComponent'
import VideoTranscript from './components/VideoTranscript'

const App = () => {
  const [outputCsv, setOutputcsv] = useState(null)
  const [outputMOV, setOutputMOV] = useState(null)
  const [videoTranscript, setVideoTranscript] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false)
  const [counter, setCounter] = useState(0)

  const pull_data = data => {
    setOutputcsv(data)
    setDataLoaded(true)
  }

  const pull_MOV_path = data => {
    setOutputMOV(data)
    console.log('MOV path: ' + outputMOV)
  }

  const pull_video_transcript = data => {
    if (data !== 'null\r') {
      setCounter(counter => counter + 1)
      if (counter % 4 === 0) {
        setVideoTranscript(data)
        console.log(videoTranscript)
      }
    }
  }

  useEffect(() => {
    console.log('CSV in parent component: ' + outputCsv)
  }, [outputCsv])

  useEffect(() => {
    console.log('Data loaded: ' + dataLoaded)
  }, [dataLoaded])

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
              <VideoPlayerCard
                func={pull_data}
                func2={pull_MOV_path}
                handleSubmission={setOutputcsv}
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
                videoData={pull_video_transcript}
              />
            </div>
          </div>
        </>
        <br />
      </div>
    </>
  )
}

export default App
