import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Axios from 'axios'

const FileUpload = props => {
  let formData = new FormData()

  const onFileChange = e => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      formData.append('file', e.target.files[0])
    }
  }

  const submitFileData = () => {
    Axios.post('https://v2.convertapi.com/upload', { formData })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <Form>
        <Form.Group controlId='formFile'>
          <div className='d-flex align-items-center'>
            <Form.Control
              type='file'
              name='fileupload'
              onChange={onFileChange}
              style={{
                borderTopLeftRadius: '26px',
                borderBottomLeftRadius: '26px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                width: '585px',
                marginTop: '-20px'
              }}
            />
            <Button
              variant='primary'
              onClick={submitFileData}
              className='ml-2'
              style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
                marginTop: '-20px',
                padding: '6.5px',
                backgroundColor: '#65aab2',
                borderColor: '#65aab2'
              }}
            >
              ㅤUploadㅤ
            </Button>
          </div>
        </Form.Group>
      </Form>
      {props.videoUrl && (
        <div>
          <video src={props.selectedFileUrl} controls width='585' />
        </div>
      )}
    </div>
  )
}

export default FileUpload
