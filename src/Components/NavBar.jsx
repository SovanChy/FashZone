import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Dropdown, Row, Col, NavItem} from "react-bootstrap";
import { useState } from "react"; 
import {Link} from 'react-router-dom';
import './NavBar.scss'
import {useLogout} from '../Hook/useLogout'


export default function NavBar() {
  const {logout, isPending} = useLogout()

  
  return (
    <div>
      <Container fluid>
        <Navbar bg="light" expand="lg" fixed="top" className="py-1 shadow-sm "> 
          <Container>
            <Navbar.Brand as={Link} to="/">
              <span>WRK</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
            <Nav>
                <Nav.Link as={Link} to="/newsfeed">Newsfeed</Nav.Link>
                <Nav.Link as={Link} to="/news">News</Nav.Link>
                <Nav.Link as={Link} to="/job">Job</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
              </Nav>
              <Nav>
                  <div>
                    {/* Using Nav.Item for Avatar */}
                    <Dropdown>
                      <Dropdown.Toggle
                        as="div"
                        id="avatar-dropdown"
                        className="d-flex align-items-center"
                      >
                        <img
                          src="https://via.placeholder.com/40"
                          alt="User Avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                           
                          }}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Button} onClick={logout}>
                          Sign Out
                        </Dropdown.Item>
                   
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                  <Link to="/login">
                      <Button className="primary">Login</Button>
                  </Link>
                  <Link to="/signup">
                      <Button className="primary">Sign up</Button>
                  </Link>
                  </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}




