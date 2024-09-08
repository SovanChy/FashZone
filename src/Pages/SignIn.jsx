import React from "react";
import "../css/SignIn.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

export default function SignIn() {
  return (
    <>
      <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Sign Up</h1>
            <br/>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" style={{ borderRadius: '0' }} />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <br/>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" style={{ borderRadius: '0' }} />
              </Form.Group>
              <br/>
              <div className="d-grid gap-2">
                <Button style={{ borderRadius: '0' }} variant="danger" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}