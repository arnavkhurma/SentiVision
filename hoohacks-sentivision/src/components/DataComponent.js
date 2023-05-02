import React, { useState, useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
import DataDownload from './DataDownload'
import './DataComponent.css'

function DataComponent (props) {
  const dataStyles = {
    cardStyles: {
      width: '690',
      height: '200',
      borderRadius: '10'
    }
  }

  const [dataLoaded, setDataLoaded] = useState(true)
  const [positiveEmotionVideo, setPositiveEmotionVideo] = useState(0.2)
  const [neutralEmotionVideo, setNeutralEmotionVideo] = useState(0.1)
  const [negativeEmotionVideo, setNegativeEmotionVideo] = useState(0.7)
  const [positiveEmotionText, setPositiveEmotionText] = useState(0.65)
  const [neutralEmotionText, setNeutralEmotionText] = useState(0.32)
  const [negativeEmotionText, setNegativeEmotionText] = useState(0.03)
  const [cosineSimilarity, setCosineSimilarity] = useState(0)
  const [sincerity, setSincerity] = useState('Unknown')

  useEffect(() => {
    if (props.condition) {
      console.log('Output file given in data comp: ' + props.outputFile)
      const pathArray = props.outputFile.split('/')
      const fileName = pathArray.pop()

      console.log('Filename Split: ' + fileName)
      let currentRow = 0 // starting row
      const interval = setInterval(() => {
        fetch('/videos/' + fileName)
          .then(response => response.text())
          .then(data => {
            const rows = data.split('\n').slice(1)
            const row = rows[currentRow].split(',')
            console.log(row)
            setPositiveEmotionVideo(parseFloat(row[9]))
            setNeutralEmotionVideo(parseFloat(row[10]))
            setNegativeEmotionVideo(parseFloat(row[11]))

            setPositiveEmotionText(parseFloat(row[12]))
            setNeutralEmotionText(parseFloat(row[13]))
            setNegativeEmotionText(parseFloat(row[14]))

            setCosineSimilarity(parseFloat(row[15]))
            setSincerity(row[16])
            props.videoData(row[17])
            console.log(row[17])

            currentRow++ // move to the next row
            if (currentRow >= rows.length) {
              clearInterval(interval)
            }
          })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [props.condition])

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
            {props.condition === false && (
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
                <tbody style={{ color: 'white' }}>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>
                      Emotion Vector from Video
                    </td>
                    <td className='text-center'>
                      {positiveEmotionVideo.toFixed(4)}
                    </td>
                    <td className='text-center'>
                      {neutralEmotionVideo.toFixed(4)}
                    </td>
                    <td className='text-center'>
                      {negativeEmotionVideo.toFixed(4)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>
                      Emotion Vector from Text
                    </td>
                    <td className='text-center'>
                      {positiveEmotionText.toFixed(4)}
                    </td>
                    <td className='text-center'>
                      {neutralEmotionText.toFixed(4)}
                    </td>
                    <td className='text-center'>
                      {negativeEmotionText.toFixed(4)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Cosine Similarity</td>
                    <td></td>
                    <td className='text-center'>
                      {cosineSimilarity.toFixed(4)}
                    </td>
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
          <DataDownload outputFile={props.outputFile} />
        </Card.Header>
      </Card>
    </div>
  )
}

export default DataComponent
