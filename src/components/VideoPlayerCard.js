import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import VideoPlayer from './VideoPlayer'
import CardOverlay from './CardOverlay'
import FileUpload from './FileUpload'

function VideoPlayerCard (props) {

  const [displayConditional, setDisplayConditional] = useState(true)
  const [selectedFile, setSelectedFile] = useState('')
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const handleFileChange = event => {
    event.preventDefault();
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('video', selectedFile);
    
    axios.post('http://127.0.0.1/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response);
      setSelectedFileUrl('');
      setDisplayConditional(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  return (displayConditional ?
    <CardOverlay
      render={
        <FileUpload width={300} height={200} />
      }
    /> : <VideoPlayer/>)
}

export default VideoPlayerCard
