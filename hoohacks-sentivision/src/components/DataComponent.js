// Importing React hooks, Bootstrap components, and custom DataDownload component
import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import DataDownload from './DataDownload';
import './DataComponent.css';

// DataComponent functional component for displaying data analysis results
function DataComponent(props) {
  // Inline styles for the card component
  const dataStyles = {
    cardStyles: {
      width: '690px', // Fixed width for the card
      height: '200px', // Fixed height for the card
      borderRadius: '10px' // Rounded corners for the card
    }
  };

  // State hooks for various emotion analysis results and data loading status
  const [dataLoaded, setDataLoaded] = useState(true);
  const [positiveEmotionVideo, setPositiveEmotionVideo] = useState(0.2);
  const [neutralEmotionVideo, setNeutralEmotionVideo] = useState(0.1);
  const [negativeEmotionVideo, setNegativeEmotionVideo] = useState(0.7);
  const [positiveEmotionText, setPositiveEmotionText] = useState(0.65);
  const [neutralEmotionText, setNeutralEmotionText] = useState(0.32);
  const [negativeEmotionText, setNegativeEmotionText] = useState(0.03);
  const [cosineSimilarity, setCosineSimilarity] = useState(0);
  const [sincerity, setSincerity] = useState('Unknown');

  // Effect hook for fetching and setting data based on the provided file
  useEffect(() => {
    if (props.condition) {
      console.log('Output file given in data comp: ' + props.outputFile);
      const pathArray = props.outputFile.split('/');
      const fileName = pathArray.pop();

      console.log('Filename Split: ' + fileName);
      let currentRow = 0; // Starting row index
      const interval = setInterval(() => {
        fetch('/videos/' + fileName)
          .then(response => response.text())
          .then(data => {
            const rows = data.split('\n').slice(1);
            const row = rows[currentRow].split(',');
            console.log(row);
            // Update state with the new data
            setPositiveEmotionVideo(parseFloat(row[9]));
            setNeutralEmotionVideo(parseFloat(row[10]));
            setNegativeEmotionVideo(parseFloat(row[11]));
            setPositiveEmotionText(parseFloat(row[12]));
            setNeutralEmotionText(parseFloat(row[13]));
            setNegativeEmotionText(parseFloat(row[14]));
            setCosineSimilarity(parseFloat(row[15]));
            setSincerity(row[16]);
            props.videoData(row[17]);
            console.log(row[17]);

            currentRow++; // Move to the next row
            if (currentRow >= rows.length) {
              clearInterval(interval); // Clear interval if we've reached the end of the data
            }
          });
      }, 500);
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [props.condition]);

  // Render the data analysis results in a card with a table
  return (
    <div
      style={{
        border: 'none',
        boxShadow: 'none',
        color: 'white',
        paddingRight: '0px',
        paddingLeft: '0px'
      }}
    >
      <Card
        className='shadow-none p-4 mb-7 bg-dark'
        style={{
          borderRadius: '15px',
          width: '566px',
          height: '565px',
          borderBottomRightRadius: '53px'
        }}
      >
        {/* Display sincerity status with dynamic background color */}
        <div
          className='card-header border-0'
          style={{
            backgroundColor: sincerity === 'Genuine' ? 'green' : 'red',
            fontSize: '25px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            borderRadius: '10px'
          }}
        >
          Sincerity: {sincerity}
        </div>

        {/* Placeholder for card image */}
        <Card.Img variant='top' />
        <Card.Body
          style={{
            height: '300px',
            border: 'none',
            boxShadow: 'none',
            color: 'white'
          }}
        >
          {/* Conditional rendering for loading spinner or data table */}
          {props.condition === false && (
            <div className='text-center'>
              {/* Loading spinner */}
              <div className='spinner-border text-light' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
          {props.condition === true && (
            <>
              <thead style={{ color: 'white' }}>
                <tr>
                  <th className='text-left'>Type of Data:</th>
                  <th className='text-center'>Positive</th>
                  <th className='text-center'>Neutral</th>
                  <th className='text-center'>Negative</th>
                </tr>
              </thead>
              <tbody>
                {/* Displaying the emotion analysis results for video */}
                <tr>
                  <td>Video</td>
                  <td>{positiveEmotionVideo.toFixed(2)}</td>
                  <td>{neutralEmotionVideo.toFixed(2)}</td>
                  <td>{negativeEmotionVideo.toFixed(2)}</td>
                </tr>
                {/* Displaying the emotion analysis results for text */}
                <tr>
                  <td>Text</td>
                  <td>{positiveEmotionText.toFixed(2)}</td>
                  <td>{neutralEmotionText.toFixed(2)}</td>
                  <td>{negativeEmotionText.toFixed(2)}</td>
                </tr>
                {/* Displaying cosine similarity and sincerity */}
                <tr>
                  <td>Cosine Similarity</td>
                  <td colSpan='3'>{cosineSimilarity.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Sincerity</td>
                  <td colSpan='3'>{sincerity}</td>
                </tr>
              </tbody>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

// Export the DataComponent
export default DataComponent;
