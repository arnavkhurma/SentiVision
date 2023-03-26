import React from 'react'
import Card from 'react-bootstrap/Card'

function CardOverlay ({ render }) {
  return (
    <Card
      className='shadow-none p-4 mb-7 bg-black'
      style={{
        border: 'none',
        boxShadow: 'none',
        color: 'white'
      }}
    >
      <Card.Img variant='top' />
      
      <Card.Body
        style={{
          height: '315px',
          border: 'none',
          boxShadow: 'none',
          color: 'white'
        }}
      >
        {render}
      </Card.Body>
    </Card>
  )
}

export default CardOverlay
