import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TrendSearchBar(props) {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <i class="bi bi-search"></i>
      <span style={{marginLeft: "10px"}}>Search</span>
       
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Search Post</Form.Label>
        <Form.Control  type="text" placeholder="Search..."  />
      </Form.Group>
    <Button variant="danger" className='me-2' type="submit">
      Search
    </Button>
    <Button variant="danger" onClick={props.onHide}>Close</Button>
  </Form>
  </Modal.Body>
</Modal>
    </>
  );
}

export default TrendSearchBar;