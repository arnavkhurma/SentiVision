// Importing React hooks, custom CSS, and Bootstrap Form component
import React, { useEffect, useState } from 'react';
import './FileUpload.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// FileUpload component for uploading video files
const FileUpload = props => {
  // Destructuring width and height from props
  const { width, height } = props;

  // Reference for the file input element
  const inputRef = React.useRef();

  // State for tracking the number of uploads
  const [count, setCount] = useState(0);

  // State for storing the source URL of the uploaded file
  const [source, setSource] = React.useState();

  // Effect hook to increment count when condition prop is true
  useEffect(() => {
    console.log(props.condition);
    console.log('Conditional is correct: ' + props.condition);
    if (props.condition === true) {
      setCount(count + 1);
    }
  }, [props.condition]);

  // Handler for file selection and upload
  const handleFileChange = async event => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);

    // Preparing the file for upload
    const formData = new FormData();
    formData.append('video', file);

    // Uploading the file using axios
    try {
      const response = await axios.post('http://localhost:5000/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded:', response.data.file_path);
      console.log('CSV finished: ', response.data.csv_filename);
      // Calling parent component functions with the response data
      props.func(response.data.csv_filename);
      props.func2(response.data.file_path);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Render method returning JSX
  return (
    <div className='VideoInput' style={{ border: 'none', padding: '0px' }}>
      {/* Conditional rendering for file input or video display */}
      {!source && (
        <div>
          {/* File input group with custom styling */}
          <Form.Group
            controlId='formFile'
            style={{
              borderTopLeftRadius: '26px',
              borderBottomLeftRadius: '26px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              width: '600px',
              marginTop: '0px'
            }}
            className='mb-3'
            ref={inputRef}
            type='file'
            onChange={handleFileChange}
            accept='.mov,.mp4'
          >
            <Form.Control type='file' />
          </Form.Group>
          <h4 style={{ textAlign: 'center' }}>
            Please choose a file to continue.
          </h4>
          {/* Loading spinner */}
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      )}
      {/* Displaying the video if a source is available and condition is met */}
      {props.condition && source ? (
        <video
          className='VideoInput_video bg-dark'
          style={{
            borderRadius: '15px',
            borderBlockColor: 'black',
            overflow: 'hidden',
            position: 'relative'
          }}
          width={width + 285}
          height={height + 20}
          controls
          autoPlay={true}
          src={source}
        />
      ) : (
        source && (
          <div>
            <h4>Processing Video</h4>
            {/* Loading spinner */}
            <div className='d-flex justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Exporting the FileUpload component
export default FileUpload;
