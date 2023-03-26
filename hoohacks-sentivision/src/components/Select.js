import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function Select () {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileInputChange = e => {
    setSelectedFile(e.target.files[0])
  }

  const handleUploadButtonClick = () => {
    // Code to upload selected file to server goes here
    console.log('File uploaded!')
  }

  return (
    <Form>
      <Form.Group>
        <Form.File
          id='file-upload'
          label='Choose a file'
          onChange={handleFileInputChange}
          custom
        />
      </Form.Group>
      <Button variant='primary' onClick={handleUploadButtonClick}>
        Upload
      </Button>
    </Form>
  )
}

export default Select
