import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useFirestore } from '../../Hook/useFirestore';
import { useAuthContext } from '../../Hook/useAuthContext';

function CalendarForm(props) {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore('events');
  const { uid, displayName, photoURL } = user;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(true);
  };
    useEffect(() => {
  
    if (isSubmitted) {
      const doc = {
        uid: uid,
        username: displayName,
        photoURL: photoURL,
        title: title,
        description: description,
        date: date,
      };

      addDocument(doc)
        .then(() => {
          console.log("Document added successfully:", doc);
          setTitle('');
          setDescription('');
          setDate('');
          props.onHide();
          setIsSubmitted(false);
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Error adding document:", err.message);
          setIsLoading(false);
        });
    }}, [isSubmitted])


  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name} Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text" placeholder="Title..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="Description..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </Form.Group>
              <Button variant="danger" className='custom-button me-2' type="submit">
                Submit
              </Button>
              <Button variant="danger" className='custom-button' onClick={props.onHide}>Close</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CalendarForm;
