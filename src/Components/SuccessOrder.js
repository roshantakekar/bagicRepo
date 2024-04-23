import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'

function SuccessOrder() {
  return (
    <Container className='pt-5 mb-5' style={{minHeight:'50vh'}}>
      <Row>
        <Col>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"></path>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"></path>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"></path>
          </svg>
        </Col>
      </Row>
      <Row className='mt-5 pb-5 '>
        <Col>
          <p className="h1 fw-bold">Thank You!</p>
          <p className="h4">We shall send a confirmation SMS to</p>
          <p className="h4 fw-bold">7057639759</p>
          <p className="h4">within an hour</p>
          <p className="h4">Your order ID is <span className='fw-bold'>ILAN5447975</span></p>
          
        </Col>
      </Row>
    </Container>
  )
}

export default SuccessOrder