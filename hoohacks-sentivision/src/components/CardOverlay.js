import React from 'react'
import Card from 'react-bootstrap/Card'

function CardOverlay ({ render }) {
  return (
    <Card
      className='shadow-none p-4 mb-5 bg-dark'
      style={{
        borderRadius: '15px',
        borderTopLeftRadius: '15px',
        border: 'none',
        boxShadow: 'none',
        color: 'white',
        paddingRight: '-20px',
        paddingLeft: '30px'
      }}
    >
      <Card.Img variant='top' />
      
      <Card.Body
        style={{
          height: '315px',
          border: 'none',
          boxShadow: 'none',
          color: 'white',
          borderTopLeftRadius: '50px'
        }}
      >
        {render}
      </Card.Body>
    </Card>
  )
}

export default CardOverlay
