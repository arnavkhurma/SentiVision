import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap'
import DataDownload from './DataDownload'
import './DataComponent.css'


const DataComponent = () => {
  const dataStyles = {
    cardStyles: {
      width: '690',
      height: '200',
      borderRadius: '10'
    }

  }

  const [dataLoaded, setDataLoaded] = useState(true);

  //first row:
  const [positiveEmotionVideo, setPositiveEmotionVideo] = useState(0.20);
  const [neutralEmotionVideo, setNeutralEmotionVideo] = useState(0.10);
  const [negativeEmotionVideo, setNegativeEmotionVideo] = useState(0.70);

  //second row:
  const [positiveEmotionText, setPositiveEmotionText] = useState(0.65);
  const [neutralEmotionText, setNeutralEmotionText] = useState(0.32);
  const [negativeEmotionText, setNegativeEmotionText] = useState(0.03);

  //third row:
  const [cosineSimilarity, setCosineSimilarity] = useState(0.837);

  //fourth row:
  const [sincerity, setSincerity] = useState('Ingenuine');

  
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
        className='shadow-none p-4 mb-7 bg-black'
        style={{ width: '566px', height: '565px' }}
      >
        <div
          className='card-header border-0'
          style={{
            color: 'black',
            fontSize: '25px ',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
          }}
        >
          Sincerity: {sincerity}
        </div>
        <Card.Img variant='top' />
        <Card.Body
          style={{
            height: '250px',
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
              </div>
            )}
            {dataLoaded === true && (
              <>
                <thead style={{ color: 'white' }}>
                  <tr>
                    <th></th>
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
                      Difference
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
            paddingBottom: '0px'
          }}
        >
          <DataDownload />
        </Card.Header>
      </Card>
    </div>
  )
}

export default DataComponent