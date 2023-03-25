import React from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import './DataComponent.css'

function DataComponent () {
    const dataStyles = {
        cardStyles: {
            width: '700',
            height: '200',
            bordeerRadius: '10'
        }
    }

    //first row
    const PosEmoVideo = 0.2
    const NeuEmoVideo = 0.1
    const NegEmoVideo = 0.7

    //second row
    const PosEmoText = 0.65
    const NeuEmoText = 0.32
    const NegEmoText = 0.03

    //third row
    const difference = 0.837

    //foruth row
    const sincerity = 'Ingenuine'

    return (
        <div
            style = {{
                border: 'none',
                boxShadow: 'none',
                color: 'white',
                paddingRight: '0px',
                paddingLeft: '0px'
            }}
        >
            <Card
                className = 'shadow-none p-4 mb-7 bg-dark'
                style = {{
                    borderRadius: '15px',
                    width: '566px',
                    height: '566px',
                    borderBottomRightRadius: '53px'
                }}
            >
                <div
                    className = 'card-header border-0'
                    style = {{
                        backgroundColor: '#000000',
                        color: 'black',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white',
                        borderRadius: '10px',
                        borderColor: 'red'
                    }}
                >
                    Findings
                </div>
                <Card.Img variant = 'top' />
                <Card.Body
                    style = {{
                        height: '300px',
                        border: 'none',
                        boxShadow: 'none',
                        color: 'white'
                    }}
                >
                    <Table borderless>

                    </Table>
                </Card.Body>

            </Card>
        </div>
             

    )
}


export default DataComponent