import React, { useState } from "react";
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
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const {signup, isPending, error} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);

  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0]; // allow the first file to be selected
    console.log(selected);
    if (!selected) { // ensure that it's not null
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError("A selected file must be an image");
      return;
    }
    // limit size
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
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

              <Form.Group className="mb-2" controlId="username">
                <Form.Control
                  className="custom-input-username"
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="thumbnail">
                <span>Set Profile</span>
                <Form.Control
                  className="custom-input-username"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
              {thumbnailError && <div className='error'>{thumbnailError}</div>}
              {error && <div>{error}</div>}

              <div className="d-grid gap-2">
                {!isPending && (
                  <Button className="custom-button" type="submit" >
                  Sign Up
                  </Button>
                  )}
                  {isPending && (
                    <Button className="custom-button" type="submit" disabled >
                    Signing...
                    </Button>
                  )}
              </div>
            </Form>
            <hr style={{ backgroundColor: 'white', color: 'white', opacity: "100%", height: '3px', border: 'none', margin: '20px 10px'}} />
            <div className="d-grid gap-2 mt-3">
                <Button className="custom-button" variant="danger" as={Link} to="/login">
                  Login
                </Button>
              </div>
            <div className="d-grid gap-2 mt-3">
                <Button className="custom-button" variant="danger" as={Link} to="/">
                  Back
                </Button>
              </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
