import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.scss";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { useLogin } from "../../Hook/useLogin";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, isPending, error} = useLogin()
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
    await login(email, password)
    } catch (err) {
      console.log("Login error: ", err.message);
    }
    setTimeout(() => {
      console.log(isPending);
      console.log(error)
    }, 3000);
  };
  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Login</h1>
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
              {/* {error && <div style={{color: "red"}}>Invalid email or password</div>} */}
              {error && <div >{error}</div>}


            {!isPending && (
              <div className="d-grid gap-2 ">
                <Button className="custom-button" variant="danger" type="submit">
                  Login
                </Button>
              </div>
            )}
            {isPending && (
              <div className="d-grid gap-2 ">
              <Button className="custom-button" variant="danger" type="submit" disabled>
                Logging
              </Button>
            </div>
            )}
            </Form>
    
            <hr style={{ backgroundColor: 'white', color: 'white', opacity: "100%", height: '3px', border: 'none', margin: '20px 10px', }} />

            <div className="d-grid gap-2 mt-3 ">
              <Button className="custom-button" variant="danger" as={Link} to="/signup">
                Sign up
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



