import React from 'react'
import { useState } from 'react';
import { Navbar, Container, Nav, Modal,Button ,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css'
const Header = () => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    return (
        <div>
            <Navbar bg="success" expand="lg" className='text-white' fixed={"top"}>
                <Container>
                    <Navbar.Brand className='br'><Link to={'/'} className="br"><div style={{ width: "180px" }}><i className="fa-solid fa-house text-white " style={{ fontSize: "20px" }}></i><span className='text-white ' style={{ marginLeft: "4px" }}>PropertyHub</span></div></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto text-white">
                            <Nav.Link ><a href='/' className='item'>Rent</a></Nav.Link>
                            <Nav.Link ><a href='/' className='item'>Buy</a></Nav.Link>
                            <Nav.Link ><a href='/' className='item'>Sell</a></Nav.Link>
                            <Nav.Link><Link to={'/propertylisting'} className="item">Properties</Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link >
                                <Link to={'/addproperty'} className='add'><i className="fa-solid fa-plus"></i><span>Add Property</span></Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/" className='item' onClick={handleShow}>Login</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/register' className='item'> Signup</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
          
            <Modal
                show={show}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Login here
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Username</Form.Label>
                    <Form.Control  placeholder='username'/>
                    <Form.Label className='mt-3'>Password</Form.Label>
                    <Form.Control type='password' placeholder='password'/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success mx-auto'>Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Header;
