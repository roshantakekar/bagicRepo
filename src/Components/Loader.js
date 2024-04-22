import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'

function Loader() {
    return (
        <Container className='pt-5 mb-5'>
            <Row>
                <Col>
                    <p className="h1 fw-bold bagicText">Please Wait ...</p>
                    <p className="h4">We have received </p>
                    <p className="h4">your details,</p>
                    <p className="h4">do give a moment</p>
                    <p className="h4">to verify the data </p>
                    <p className="h4">submitted </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Loader