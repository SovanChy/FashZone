import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "../Custom/SignIn.scss";

export default function SignUp() {
  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Sign Up</h1>
            <Form>
                <Form.Group className="mb-4" controlId="username">
                  <Form.Control
                    className="custom-input-username"
                    type="text"
                    placeholder="Enter Username"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Control
                    className="custom-input-email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Control
                    className="custom-input-password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                  <Form.Control
                    className="custom-input-password"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button className="custom-button" type="submit">
                    Sign Up
                  </Button>
                </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
