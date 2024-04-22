import React from 'react'
import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <Container fluid className='p-5 footer-bg text-start'>
            
            <p>Bajaj Allianz General Insurance Company</p>
            <div className="footerTextSmall">
            <p> <span>Tollfree:</span> <span>For sales :</span><a href="tel:1800-209-0144%20">1800-209-0144 </a> | <span>For service  :</span><a href="tel:1800-209-5858">1800-209-5858</a></p>
            <p> <span>Email id:</span> <a href="mailto:%20bagichelp@bajajallianz.co.in"> bagichelp@bajajallianz.co.in</a></p>
            <p> <span>For senior citizens:</span> <a href="mailto:seniorcitizen@bajajallianz.co.in">
                seniorcitizen@bajajallianz.co.in</a></p>
            <p> <span> Fax no: </span> 020-30512246</p>
            <p>All the grievances are closed within the stipulated time frame of 2 weeks.</p>
            <p> <span>Registered Address: </span>Bajaj Allianz House, Airport Road, Yerawada, Pune-411006</p>
            </div>
        </Container>
    )
}

export default Footer