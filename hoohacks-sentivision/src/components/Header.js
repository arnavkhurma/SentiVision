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
          <img
            src={logo}
            width='auto'
            height='38'
            className='d-inline-block align-center'
            display='block'
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
