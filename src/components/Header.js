import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import logo from './images/sentivision-removebg-preview.png'

const Header = () => {
  return (
    <Navbar
      style={{
        backgroundColor: '#000000'
      }}
      bg='black'
      variant='black'
    >
      <Container className='justify-content-center py-3'>
        <Navbar.Brand href='#home'>
          <h1 style={{color: 'white'}}>Sentivision</h1>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
