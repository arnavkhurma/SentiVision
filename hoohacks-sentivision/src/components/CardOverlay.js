// Importing React and Card component from react-bootstrap
import React from 'react';
import Card from 'react-bootstrap/Card';

// CardOverlay functional component accepting a render prop
function CardOverlay({ render }) {
  // Render method returns a styled Card component with a render prop for custom content
  return (
    <Card
      className='shadow-none p-4 mb-5 bg-dark' // Class names for styling
      style={{
        borderRadius: '15px', // Rounded corners for the card
        borderTopLeftRadius: '15px', // Specific rounded corner for the top-left
        border: 'none', // No border for the card
        boxShadow: 'none', // No shadow for the card
        color: 'white', // Text color for the card
        paddingRight: '-20px', // Right padding for the card
        paddingLeft: '30px' // Left padding for the card
      }}
    >
      <Card.Img variant='top' /> // Placeholder for card image

      <Card.Body
        style={{
          height: '315px', // Fixed height for the card body
          border: 'none', // No border for the card body
          boxShadow: 'none', // No shadow for the card body
          color: 'white', // Text color for the card body
          borderTopLeftRadius: '50px' // Specific rounded corner for the card body
        }}
      >
        {render} // Render prop used to display custom content
      </Card.Body>
    </Card>
  );
}

// Exporting CardOverlay for use in other parts of the application
export default CardOverlay;
