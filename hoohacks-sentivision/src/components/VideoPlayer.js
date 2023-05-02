import { React, useEffect, useRef } from 'react'
import './VideoPlayer.css'

const VideoPlayer = props => {
  const pathArray = props.outputFile.split('/')
  const fileName = pathArray.pop()

  const videoRef = useRef(null)

  useEffect(() => {
    if (props.autoplayControl) {
      videoRef.current.play()
    }
  }, [props.autoplayControl])

  return (
    <div
      className='video-container'
      style={{
        margin: '30px',
        borderRadius: '100px',
        borderBlockColor: 'black',
        overflow: 'static',
        position: 'static'
      }}
    >
      <video
        className='video'
        ref={videoRef}
        width='100%'
        height='100%'
        marginRight='300px'
        muted
        controls={!props.condition}
        autoPlay={props.condition}
        style={{
          marginTop: '-56px',
          marginRight: '300px',
          marginBottom: '5000px'
        }}
      >
        <source src={fileName} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
