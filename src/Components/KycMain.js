import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

import CustomerOnboarding from './CustomerOnboarding';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IndividualForm from './IndividualForm';
import CorporateForm from './CorporateForm';


function KycMain() {
    
    return (
        <Container fluid >
            <Row className='mb-3 '>
                <Col sm={4} className='mb-2'>
                    <CustomerOnboarding />
                </Col>
                <Col sm={8} className='tabContentCustom'>
                    <Tabs
                        defaultActiveKey="individual"
                        id="uncontrolled-tab-example"
                        className="mb-3 w-100 navTabsCustom"
                        
                    >
                        <Tab eventKey="individual" title="Individual/Proprietor">
                            <IndividualForm/>
                        </Tab>
                        <Tab eventKey="corporate" title="Corporate">
                            <CorporateForm/>
                        </Tab>
                    </Tabs>

                    
                </Col>
            </Row>
        </Container>



    )

};
export default KycMain