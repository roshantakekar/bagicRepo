import React from 'react';
import {Row,Col} from 'react-bootstrap';

function CustomerOnboarding() {
  return (
    <Row className='siteBg custOnboarding p-5'>
      <Col md={12}>
        <div className='vcenter'>
        <img src='bagiclogo.png'
          className="d-inline-block align-top mb-2"
          alt="bajiclogo"
        />
        <div>
          Customer Onboarding
        </div>
        </div>
      </Col>
    </Row>
  )
}

export default CustomerOnboarding