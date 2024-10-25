import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useFirestore } from '../Hook/useFirestore';
import { useAuthContext } from '../Hook/useAuthContext';
import { useStorage } from '../Hook/useStorage';

function PostForm(props) {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore('MediaPost');
  const { uid, displayName, photoURL } = user;
  const { uploadMedia, urls, paths } = useStorage('MediaPost');

  const [imageVideo, setImageVideo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [like] = useState(0);
  const [view] = useState(0);
  const [share] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePost = (e) => {
    let selectedFiles = [];
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        selectedFiles.push(e.target.files[i]);
      }
    } catch (err) {
      console.log(err);
    }

    console.log(selectedFiles);

    if (selectedFiles.length === 0) {
      setImageVideo("Please select at least one file");
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.includes('image') && !file.type.includes('video')) {
        alert("A selected file must be an image, a video, or an MKV file");
        return false;
      }
      if (file.size > 1000000000) { // 1GB = 1000000000 bytes
        alert('File size must be less than 1GB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      setImageVideo("No valid files selected");
      return;
    }

    setImageVideo(validFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageVideo.length === 0) {
      alert("No file selected");
      return;
    }

    try {
      // Start the upload process
      await uploadMedia(imageVideo);
      setIsSubmitted(true); // Set submission status to true
    } catch (err) {
      alert("Error during upload:", err.message);
    }
  };

  // useEffect to wait for url and path to be set before adding the document
  useEffect(() => {
    if (isSubmitted && urls.length > 0 && paths.length > 0) {
      // Prepare document to be added
      const doc = {
        uid: uid,
        username: displayName,
        photoURL: photoURL,
        imageURL: urls, // Use the uploaded image URLs
        imagePath: paths, // Use the file paths
        title: title,
        description: description,
        like: like,
        view: view,
        share: share, // Add share field
        comment: []
      };

      // Add the document to Firestore
      addDocument(doc)
        .then(() => {
          console.log("Document added successfully:", doc);
          // Reset form fields after successful upload
          setImageVideo([]);
          setTitle('');
          setDescription('');
          props.onHide(); // Close the modal
          setIsSubmitted(false); // Reset submission status
        })
        .catch((err) => {
          alert("Error adding document:", err.message);
        });
    }
  }, [isSubmitted, urls, paths]); // This effect runs when isSubmitted, urls, and paths are updated

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
              <Form.Control
                type="text" placeholder="Title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image/Video</Form.Label>
              <Form.Control type="file" multiple placeholder="Image..." onChange={handlePost} />
            </Form.Group>
            <Button variant="danger" className='custom-button me-2' type="submit">
              Submit
            </Button>
            <Button variant="danger" className='custom-button' onClick={props.onHide}>Close</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostForm;
