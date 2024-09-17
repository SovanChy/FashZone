import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "../Custom/SignIn.scss";


export default function SignIn() {
 
  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Sign In</h1>
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control className="custom-input-email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control className="custom-input-password" type="password" placeholder="Password"  />
                <a href="#" className="link-grey">Forget your password?</a>
              </Form.Group>
            
              <div className="d-grid gap-2">
                  <Button className="custom-button" variant="danger"  type="submit">
                    Sign In
                  </Button>
                </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}