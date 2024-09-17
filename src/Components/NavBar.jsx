import React from "react";
import { Container, Navbar, Nav, Button, Dropdown, Row, Col} from "react-bootstrap";
import { useState } from "react";
import '../Custom/NavBar.scss';

export default function NavBar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [activeKey, setActiveKey] = useState('/');

  //Thinking of using prop to alter element


  //Handling sign in & sign out
  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };
  return (
    <>
      <Container fluid>
        <Navbar bg="light" expand="lg" fixed="top" className="py-1 shadow-sm "> 
          <Container>
            <Navbar.Brand href="#home">
              <span>WRK</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav activeKey="/Newsfeed">
                <Nav.Link href="/Newsfeed">Newsfeed</Nav.Link>
                <Nav.Link href="/News">News</Nav.Link>
                <Nav.Link href="/Job">Job</Nav.Link>
                <Nav.Link href="/Event">Event</Nav.Link>
              </Nav>
              <Nav>
                {isSignedIn ? (
                  <>
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
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>
                          Sign Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <Button variant="outline-primary" onClick={handleSignIn}>
                    Sign In
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}
