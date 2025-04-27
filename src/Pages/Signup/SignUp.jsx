import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "../Signin/Login.scss";
import { Link } from "react-router-dom";
import { useSignup } from "../../Hook/useSignup";

const commonPasswords = [
  "password", "Password123@", "123456", "123456789", "qwerty", "abc123", 
  "password1", "123123", "admin", "letmein", "welcome", "monkey", "dragon", 
  "football", "iloveyou", "master", "sunshine", "shadow", "ashley", "bailey", 
  "superman", "qazwsx", "michael", "ninja", "mustang", "password123",
  "1234", "12345", "12345678", "1234567", "1234567890", "111111", "123321",
  "654321", "666666", "7777777", "1q2w3e4r", "1qaz2wsx", "qwertyuiop", "asdfghjkl",
  "zxcvbnm", "1q2w3e", "q1w2e3r4", "123qwe", "1qazxsw2", "qwerty123", "zaq12wsx"
];

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {signup, isPending, error} = useSignup()

  const validatePassword = (password) => {
    if (!password) return "";
    
    const errors = [];
    
    // Check for minimum length
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    
    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter");
    }
    
    // Check for lowercase
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter");
    }

     // Check for number
     if (!/[0-9]/.test(password)) {
      errors.push("Password must include at least one number");
    }
    
    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include at least one special character");
    }
    
    // Check for common passwords
    if (commonPasswords.some(commonPassword => commonPassword === password)) {
      errors.push("This password is too common. Please choose a stronger password");
    }
    
    return errors.join("\n");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && displayName && confirmPassword) {
      // check if password is valid
      const validationError = validatePassword(password);
      // if there is an error, set the error message and return
      if (validationError) {
        setPasswordError(validationError);
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      signup(email, password, displayName);
    } else {
      setPasswordError("Please fill in all credentials");
    }
  };

  useEffect(() => {
    document.body.style.paddingTop = '0px';
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
                {passwordError && (
                  <div className="text-danger mt-2" style={{ whiteSpace: 'pre-line' }}>
                    {passwordError}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                <Form.Control
                  className="custom-input-password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
              </Form.Group>

              {error && <div className="text-danger mb-3">{error}</div>}

              <div className="d-grid gap-2">
                {!isPending && (
                  <Button className="custom-button-1" type="submit">
                    Sign Up
                  </Button>
                )}
                {isPending && (
                  <Button className="custom-button-1" type="submit" disabled>
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