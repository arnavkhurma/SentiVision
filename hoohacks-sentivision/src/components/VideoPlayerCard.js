import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VideoPlayer from './VideoPlayer'
import CardOverlay from './CardOverlay'
import FileUpload from './FileUpload'

function VideoPlayerCard (props) {
  const [displayConditional, setDisplayConditional] = useState(true)

  const pull_data = data => {
    console.log('Video Player Card: ' + data)
    props.func(data)
  }

  const pull_MOV_path = data => {
    console.log('MOV path: ' + data)
    props.func2(data)
  }

  return displayConditional ? (
    <CardOverlay
      render={
        <FileUpload
          func={pull_data}
          func2={pull_MOV_path}
          condition={props.condition}
          width={400}
          height={300}
          style={{ borderTopLeftRadius: '26px' }}
        />
      }
    />
  ) : (
    <VideoPlayer
      outputFile={props.outputFile}
      autoplayControl={true}
      condition={props.condition}
    />
  )
}

export default VideoPlayerCard
