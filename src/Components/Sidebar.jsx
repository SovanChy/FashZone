import React from 'react'
import { Container, Nav, Row, Col, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';
import { useLogout } from '../Hook/useLogout';
//css styling
import './Sidebar.scss'
 
export default function Sidebar() { 
    const {user} = useAuthContext()
    const {logout} = useLogout()

    
    
          return (
            <Container>
                <Row>
                    <Col>
                        <Nav className="col-md-2 col-sm-3 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                        <Nav.Item className='d-flex align-items-center'>
                            <img
                            src={user.photoURL}
                            alt="User Avatar"
                            className="rounded-circle ms-3"
                            style={{
                            objectFit:"cover",
                            width: "60px",
                            height: "60px",
                            cursor: "pointer",
                             }}
                            ></img>
                            <span className='userName'>{user.displayName.toUpperCase()}</span>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link className="sidebar-header">
                                <img src={require(`../assets/Asset1.png`)}className='logo'></img></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link className="active" as={Link} to="/">NEWSFEED</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link  as={Link} to="/trending">TREND</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link as={Link} to="/news">NEWS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link as={Link} to="/job">JOB</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link as={Link} to="/events">EVENTS</Nav.Link>
                            </Nav.Item>
                            <div className="sidebar-bottom"> 
                            <Nav.Item>
                                <Button className='custom-button ms-3'  onClick={logout}>Sign out</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/profile">PROFILE</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/setting">SETTING</Nav.Link>
                            </Nav.Item>                
                            </div>
                        </div>
                        </Nav>
                    </Col> 
                </Row>
            </Container>
          );
        }

