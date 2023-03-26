import React from 'react';
import logo from './images/download-cloud.png';

function DataDownload(props) {
  const onButtonClick = () => {
    fetch('/files/LinearData.csv').then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob)
        let downloadLink = document.createElement('a')
        downloadLink.href = fileURL
        downloadLink.download = 'LinearData.csv'
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
          borderRadius: '1000px',
          width: '74px',
          height: '69px',
          backgroundColor: '#ffffff'
        }}
      >
        <img src={logo} style={{ width: '10px', height: '10px' }}></img>
      </button>
    </div>
  )
}

export default DataDownload;
