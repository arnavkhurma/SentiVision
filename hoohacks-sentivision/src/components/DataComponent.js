import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import DataDownload from './DataDownload';
import './DataComponent.css';

function DataComponent() {
  const dataStyles = {
    cardStyles: {
      width: '690',
      height: '200',
      borderRadius: '10'
    }
  };

  const [dataLoaded, setDataLoaded] = useState(true);

  const [positiveEmotionVideo, setPositiveEmotionVideo] = useState(0.2);
  const [neutralEmotionVideo, setNeutralEmotionVideo] = useState(0.1);
  const [negativeEmotionVideo, setNegativeEmotionVideo] = useState(0.7);

  const [positiveEmotionText, setPositiveEmotionText] = useState(0.65);
  const [neutralEmotionText, setNeutralEmotionText] = useState(0.32);
  const [negativeEmotionText, setNegativeEmotionText] = useState(0.03);

  const [cosineSimilarity, setCosineSimilarity] = useState(0);

  const [sincerity, setSincerity] = useState('Unknown');
  useEffect(() => {
    let currentRow = 0; // starting row
    const interval = setInterval(() => {
      fetch("files/Sentivision.csv")
        .then((response) => response.text())
        .then((data) => {
          const rows = data.split('\n').slice(1);
          const row = rows[currentRow].split(',');
  
          setPositiveEmotionVideo(parseFloat(row[9]));
          setNeutralEmotionVideo(parseFloat(row[10]));
          setNegativeEmotionVideo(parseFloat(row[11]));
  
          setPositiveEmotionText(parseFloat(row[12]));
          setNeutralEmotionText(parseFloat(row[13]));
          setNegativeEmotionText(parseFloat(row[14]));
  
          setCosineSimilarity(parseFloat(row[15]));
          setSincerity(row[16]);
  
          setDataLoaded(true);
  
          currentRow++; // move to the next row
          if (currentRow >= rows.length) {
            clearInterval(interval);
          }
        });
    }, 250);
  
    return () => clearInterval(interval);
  }, []);  
  
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
        style={{ borderRadius: '15px', width: '566px', height: '565px', borderBottomRightRadius: '53px' }}
      >
<div
  className='card-header border-0'
  style={{
    backgroundColor: sincerity === 'Genuine' ? 'green' : 'red',
    color: 'black',
    fontSize: '25px ',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    borderRadius: '10px',
    borderColor: 'red'
  }}
>
  Sincerity: {sincerity}
</div>

        <Card.Img variant='top' />
        <Card.Body
          style={{
            height: '300px',
            border: 'none',
            boxShadow: 'none',
            color: 'white'
          }}
        >
          <Table borderless>
            {dataLoaded === false && (
              <div className='text-center'>
                <br />
                <br />
                <br />
                <br />
                <div class='spinner-border text-light' role='status'>
                  <span class='visually-hidden'>Loading...</span>
                </div>
              </div>
            )}
            {dataLoaded === true && (
              <>
                <thead style={{ color: 'white' }}>
                  <tr>
                    <th className='text-left'>Type of Data:</th>
                    <th className='text-center'>Positive</th>
                    <th className='text-center'>Neutral</th>
                    <th className='text-center'>Negative</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'white' }}>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>
                      Emotion Vector from Video
                    </td>
                    <td className='text-center'>{positiveEmotionVideo}</td>
                    <td className='text-center'>{neutralEmotionVideo}</td>
                    <td className='text-center'>{negativeEmotionVideo}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>
                      Emotion Vector from Text
                    </td>
                    <td className='text-center'>{positiveEmotionText}</td>
                    <td className='text-center'>{neutralEmotionText}</td>
                    <td className='text-center'>{negativeEmotionText}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>
                      Cosine Similarity
                    </td>
                    <td></td>
                    <td className='text-center'>{cosineSimilarity}</td>
                  </tr>
                </tbody>
              </>
            )}
          </Table>
        </Card.Body>
        <Card.Header
          style={{
            display: 'flex',
            justifyContent: 'right',
            paddingBottom: '0px',
            marginRight: '-20px'
          }}
        >
          <DataDownload />
        </Card.Header>
      </Card>
    </div>
  )
}

export default DataComponent
