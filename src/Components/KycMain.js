import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

import CustomerOnboarding from './CustomerOnboarding';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IndividualForm from './IndividualForm';


function KycMain() {
    


    return (
        <Container>
            <Row className='mb-3 '>
                <Col sm={4}>
                    <CustomerOnboarding />
                </Col>
                <Col sm={8}>
                    <Tabs
                        defaultActiveKey="individual"
                        id="uncontrolled-tab-example"
                        className="mb-3 w-100"
                        
                    >
                        <Tab eventKey="individual" title="Individual/Proprietor" >
                            <IndividualForm/>
                        </Tab>
                        <Tab eventKey="corporate" title="Corporate">
                            Corporate Form Here
                        </Tab>
                    </Tabs>

                    
                </Col>
            </Row>
        </Container>



    )

};
export default KycMain