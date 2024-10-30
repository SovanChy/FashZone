import React from 'react'
import { Container, Nav, Row, Col, Button} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';
import { useLogout } from '../Hook/useLogout';
//css styling
import './Sidebar.scss'
 
export default function Sidebar() { 
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const navigate = useNavigate()

    
    
          return (
            <Container>
                <Row>
                    <Col>
                        <Nav className="col-md-2 col-sm-3 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                        <Nav.Item className='d-flex align-items-center'>
                            <div className='d-flex align-items-center' onClick={() => navigate(`/profile/${user.uid}`)}>
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
                            </div>
                            </Nav.Item>
                            <Nav.Item className='mt-2'>
                                <img src={require(`../assets/Asset1.png`)}className='logo ms-3 mt-2'></img>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link className="active" as={Link} to="/newsfeed">NEWSFEED</Nav.Link>
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
                            <Nav.Item className="custom-button-signOut" as={Button} onClick={() => logout()}>
                                SIGN OUT
                            </Nav.Item>
                            <Nav.Item > 
                                <Nav.Link as={Link} to={`/profile/${user.uid}`}>PROFILE</Nav.Link>
                            </Nav.Item> 
                            <Nav.Item className='mb-2'>
                                <Nav.Link as={Link} to={`/setting/${user.uid}`}>SETTING</Nav.Link>
                            </Nav.Item>               
                            </div>
                        </div>
                        </Nav>
                    </Col> 
                </Row>
            </Container>
          );
        }

