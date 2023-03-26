import React from 'react'
import Card from 'react-bootstrap/Card'

function VideoTranscript (props) {
  return (
    <div>
      <Card
        body
        className='shadow-none p-4 mb-7 bg-dark' style={{
          width: '765px',
          height: '179px',
          marginTop: '-25px',
          marginLeft: '0px',
          marginRight: '0px',
          overflow: 'hidden',
          position: 'static',
          borderRadius: '10px',
          color: 'white'
        }}
      >
        {props.text}
      </Card>
    </div>
  )
}

export default VideoTranscript
