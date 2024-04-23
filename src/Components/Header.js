//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
//import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className=" mb-3 header-bg">
                    <Container fluid>
                        <Navbar.Brand href="#home">
                            <img src='bagiclogo.png'
                                className="d-inline-block align-top"
                                alt="bajiclogo"
                            />
                        </Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />  <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-start flex-grow-1 pe-3">
                                    <Nav.Link href="#action1">Insure</Nav.Link>
                                    <Nav.Link href="#action2">Renew</Nav.Link>
                                    <Nav.Link href="#action1">Claim</Nav.Link>
                                    <Nav.Link href="#action2">Government Schemes</Nav.Link>
                                    <Nav.Link href="#action2">Insurance Samjho</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas> */}
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Header;