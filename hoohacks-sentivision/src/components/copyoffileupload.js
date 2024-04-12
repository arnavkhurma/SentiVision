// Importing React, Bootstrap components, and Axios for HTTP requests
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';

// FileUpload component for uploading files
const FileUpload = props => {
  // Initialize FormData to append files to
  let formData = new FormData();

  // Handler for file selection
  const onFileChange = e => {
    console.log(e.target.files[0]); // Log the selected file
    if (e.target && e.target.files[0]) {
      formData.append('file', e.target.files[0]); // Append the file to formData
    }
  };

  // Handler for submitting the file
  const submitFileData = () => {
    // Post formData to the specified URL
    Axios.post('https://v2.convertapi.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res); // Log the response on success
      })
      .catch(error => {
        console.log(error); // Log any error
      });
  };

  // Render the file upload form
  return (
    <div>
      <Form>
        <Form.Group controlId='formFile'>
          <div className='d-flex align-items-center'>
            {/* File input control with custom styling */}
            <Form.Control
              type='file'
              name='fileupload'
              onChange={onFileChange}
              style={{
                borderTopLeftRadius: '26px',
                borderBottomLeftRadius: '26px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                width: '585px',
                marginTop: '-20px',
              }}
            />
            {/* Upload button with custom styling */}
            <Button
              variant='primary'
              onClick={submitFileData}
              className='ml-2'
              style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
                marginTop: '-20px',
                padding: '6.5px',
                backgroundColor: '#65aab2',
                borderColor: '#65aab2',
              }}
            >
              Upload
            </Button>
          </div>
        </Form.Group>
      </Form>
      {/* Conditional rendering of video element if a video URL is provided */}
      {props.videoUrl && (
        <div>
          <video src={props.videoUrl} controls width='585' />
        </div>
      )}
    </div>
  );
};

// Export the FileUpload component
export default FileUpload;
