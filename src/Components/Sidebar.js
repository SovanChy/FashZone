import React from 'react'
import { Container, Nav, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
//css styling
import './Sidebar.scss'
 
export default function Sidebar() { 
          return (
            <Container>
                <Row>
                    <Col>
                        <Nav className="col-md-2 col-sm-3 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <Nav.Item>
                            <Nav.Link className="sidebar-header">WRK</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link className="active" as={Link} to="/">NEWSFEED</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link  as={Link} to="/">TREND</Nav.Link>
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

