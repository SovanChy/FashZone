import React from "react";
import "./SignIn.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

export default function SignUp()
{
    return (
        <>
            <Container fluid className="background-image">
        <Row className="Justify-content-center align-items-center vh-100">
          <Col lg={{ span: 4, offset: 4}}>
            <h1>Sign Up</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="sharp-corner"  type="email" placeholder="Enter email" style={{borderRadius: '0'}}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" style={{borderRadius: '0'}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button style={{borderRadius: '0'}}  variant="danger" type="submit">
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