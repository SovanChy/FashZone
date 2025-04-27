import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useFirestore } from '../../Hook/useFirestore';
import { useAuthContext } from '../../Hook/useAuthContext';
import { useStorage } from '../../Hook/useStorage';

function EditForm({ doc, show, onHide, name }) {
  const { updateDocument } = useFirestore('MediaPost');
  const { uploadMedia, urls, paths } = useStorage('MediaPost');

  const [imageVideo, setImageVideo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //accessing the id of an object modal
  const id = typeof doc === 'object' && doc !== null ? doc.id : doc;

  //returning old data for edit

  useEffect(() => {
    if (doc) {
      setTitle(doc.title || "");
      setDescription(doc.description || "");
      setImageVideo(doc.imageURL || "");
    }
  }, [doc]);

  const handlePost = (e) => {
    let selectedFiles = [];
    try {
        for (let i = 0; i < e.target.files.length; i++) {
            selectedFiles.push(e.target.files[i]);
        }
    } catch (err) {
        console.log(err);
    }

    const validFiles = selectedFiles.filter((file) => {
        if (!file.type.includes('image') && !file.type.includes('video')) {
            alert("A selected file must be an image, a video, or an MKV file");
            return false;
        }
        if (file.size > 1000000000) {
            alert('File size must be less than 1GB');
            return false;
        }
        return true;
    });

    setImageVideo(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        if (imageVideo.length > 0) {
            await uploadMedia(imageVideo);
        }
        setIsSubmitted(true);
    } catch (err) {
        alert("Error during upload:", err.message);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
        if (isSubmitted) {
            let updateData = {
                title: title,
                description: description,
            };

            if (urls.length > 0 && paths.length > 0) {
                updateData.imageURL = urls;
                updateData.imagePath = paths;
            }

            updateDocument(id, updateData);
            onHide();
            setImageVideo([]);
            setTitle('');
            setDescription('');
            setIsSubmitted(false);
            setIsLoading(false);

        }
    } catch (err) {
        alert("Error updating document: " + err.message);
    }
  }, [isSubmitted, urls, paths]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {name} Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image/Video (Optional)</Form.Label>
              <Form.Control 
                type="file" 
                multiple 
                onChange={handlePost} 
              />
            </Form.Group>
            <Button variant="danger" className='custom-button me-2' type="submit">
              Submit
            </Button>
            <Button variant="danger" className='custom-button' onClick={onHide}>
              Close
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EditForm;