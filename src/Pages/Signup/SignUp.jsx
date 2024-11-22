import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "../Signin/Login.scss";
import { Link } from "react-router-dom";
import { useSignup } from "../../Hook/useSignup";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const {signup, isPending, error} = useSignup()

 const [confirmPassword, setConfirmPassword] = useState('');


const handleSubmit = (e) => {
  e.preventDefault();
  if (email && password && displayName && confirmPassword) {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signup(email, password, displayName);
  } else {
    alert("Please fill in your credentials");
  }
};

  //apply css styling
  useEffect(() => {
    // Apply specific styles to the body when this component is mounted
  
    document.body.style.paddingTop = '0px';

    // Clean up and remove styles when component unmounts
    return () => {
        document.body.style = '';
    };
}, []);


  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="username">
                <Form.Control
                  className="custom-input-username"
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control
                  className="custom-input-email"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control
                  className="custom-input-password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control
                  className="custom-input-password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
              </Form.Group>


              {error && <div>{error}</div>}

              <div className="d-grid gap-2">
                {!isPending && (
                  <Button className="custom-button-1" type="submit" >
                  Sign Up
                  </Button>
                  )}
                  {isPending && (
                    <Button className="custom-button-1" type="submit" disabled >
                    Signing...
                    </Button>
                  )}
              </div>
            </Form>
            <hr style={{ backgroundColor: 'white', color: 'white', opacity: "100%", height: '3px', border: 'none', margin: '20px 10px'}} />
            <div className="d-grid gap-2 mt-3">
                <Button className="custom-button-1" variant="danger" as={Link} to="/login">
                  Login
                </Button>
              </div>
            <div className="d-grid gap-2 mt-3">
                <Button className="custom-button-1" variant="danger" as={Link} to="/">
                  Back
                </Button>
              </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
