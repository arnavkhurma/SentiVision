import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import logo from './images/sentivision-removebg-preview.png'

const Header = props => {
    return (
        <Navbar
            style={{
                backgroundColor: '#000001'
            }}
            bg = 'black'
            variant = 'black'
        >
            <Container className = 'justify-content-center py-3'>
                <Navbar.Brand href = '#home'>
                    <img
                        src = {logo}
                        width = 'auto'
                        height = '40'
                        className = 'd-inline-block align center'
                        display = 'block'
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header