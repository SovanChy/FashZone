import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

function PostForm(props) {
    const [imageVideo, setImageVideo] = useState('')
    const handlePost = (e) => {
        setImageVideo(null)
        let selected = e.target.files[0]
        if (!selected) { // ensure that it's not null
            setImageVideo("Please select a file");
            return;
          }
          if (!selected.type.includes('image') && !selected.type.includes('video')) {
            setImageVideo("A selected file must be an image");
            return;
          }
          // limit size
          if (selected.size > 1000000) {
            setImageVideo('Image file size must be less than 100000kb');
            return;
          }
        setImageVideo(selected)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(imageVideo)

    }
    

  return (
    <>
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Post
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control type="text" placeholder="Title..." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Description</Form.Label>
            <Form.Control  type="file" placeholder="Description..." onChange={handlePost} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" type="text" placeholder="Description..." />
          </Form.Group>
          </Form>

      <Button variant="danger" className='me-2' type="submit">
        Submit
      </Button>
      <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
    </>
);
}

export default PostForm;