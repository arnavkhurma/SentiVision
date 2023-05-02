import React from 'react'
import logo from './images/download-cloud.png'

function DataDownload (props) {
  const onButtonClick = () => {
    const pathArray = props.outputFile.split('/')
    const fileName = pathArray.pop()

    fetch('/videos/' + fileName).then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob)
        let downloadLink = document.createElement('a')
        downloadLink.href = fileURL
        downloadLink.download = fileName
        downloadLink.click()
      })
    })
  }

  return (
    <div
      style={{
        display: 'inline-block'
      }}
    >
      <button
        type='button'
        className='btn btn-light btn-lg ml-2'
        onClick={onButtonClick}
        style={{
          paddingBottom: '15px',
          borderRadius: '1000px',
          width: '74px',
          height: '69px',
          backgroundColor: '#ffffff'
        }}
      >
        <img src={logo} style={{ width: '40px', height: '40px' }}></img>
      </button>
    </div>
  )
}

export default DataDownload
