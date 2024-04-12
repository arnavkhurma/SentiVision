// Importing React and cloud download icon
import React from 'react';
import logo from './images/download-cloud.png';

// DataDownload functional component for downloading files
function DataDownload(props) {
  // Handler for the button click event
  const onButtonClick = () => {
    // Extracting the file name from the outputFile prop
    const pathArray = props.outputFile.split('/');
    const fileName = pathArray.pop();

    // Fetching the file from the server and creating a download link
    fetch('/videos/' + fileName).then(response => {
      response.blob().then(blob => {
        // Creating a URL for the blob object
        const fileURL = window.URL.createObjectURL(blob);
        // Creating a temporary download link element
        let downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = fileName; // Setting the file name for download
        downloadLink.click(); // Triggering the download
      });
    });
  };

  // Render method returning JSX
  return (
    <div style={{ display: 'inline-block' }}>
      {/* Download button with an image icon */}
      <button
        type='button'
        className='btn btn-light btn-lg ml-2'
        onClick={onButtonClick}
        style={{
          paddingBottom: '15px',
          borderRadius: '1000px', // Circular button
          width: '74px',
          height: '69px',
          backgroundColor: '#ffffff' // White background color
        }}
      >
        {/* Cloud download icon */}
        <img src={logo} alt="Download" style={{ width: '40px', height: '40px' }} />
      </button>
    </div>
  );
}

// Exporting the DataDownload component
export default DataDownload;
