import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useFirestore } from '../../Hook/useFirestore';
import { useAuthContext } from '../../Hook/useAuthContext';
import { useStorage } from '../../Hook/useStorage';

function PostForm(props) {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore('MediaPost');
  const { uid, displayName, photoURL } = user;
  const { uploadMedia, urls, paths, clearMedia } = useStorage('MediaPost');

  const [imageVideo, setImageVideo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [like] = useState(0);
  const [view] = useState(0);
  const [share] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        alert("A selected file must be an image or a video file");
        return false;
      }
      if (file.length < 1) {
        alert("You must select at least one file");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (imageVideo.length > 0) {
      try {
        await uploadMedia(imageVideo);
        setIsSubmitted(true); // Set submission status to true if media is uploaded
      } catch (err) {
        alert("Error during upload:", err.message);
        setIsLoading(false);
      }
    } else {
      // No media to upload, set submission status directly
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted && (urls.length > 0 || imageVideo.length === 0)) {
      const doc = {
        uid: uid,
        username: displayName,
        photoURL: photoURL,
        imageURL: urls.length > 0 ? urls : null, // Conditionally add URLs
        imagePath: paths.length > 0 ? paths : null, // Conditionally add paths
        title: title,
        description: description,
        like: like,
        view: view,
        share: share,
        comment: []
      };

      addDocument(doc)
        .then(() => {
          console.log("Document added successfully:", doc);
          setImageVideo([]);
          setTitle('');
          setDescription('');
          props.onHide();
          setIsSubmitted(false);
          setIsLoading(false);
          clearMedia(); 
        })
        .catch((err) => {
          alert("Error adding document:", err.message);
          setIsLoading(false);
        });
    }
  }, [isSubmitted, urls, paths]);

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
              <Form.Group className="mb-3" controlId="formMedia">
                <Form.Label>Image/Video</Form.Label>
                <Form.Control type="file" multiple onChange={handlePost} required/>
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

export default PostForm;
