import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useFirestore } from '../Hook/useFirestore';
import { useAuthContext} from '../Hook/useAuthContext';
import { useStorage } from '../Hook/useStorage';


function PostForm(props) {
  const {user} = useAuthContext()
  const { addDocument} = useFirestore('MediaPost')
  const { uid, displayName, photoURL } = user
  const {uploadMedia, urls, paths, error } = useStorage('MediaPost')
  

  //add like, views, share, and comment
    const [imageVideo, setImageVideo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('') 
    const [like, setLike] = useState(0)
    const [view, setView] = useState(0)
    const [share, setShare] = useState('')



    const handlePost = (e) => {
      setImageVideo([]);
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
          console.log("A selected file must be an image or a video");
          return false;
        }
        if (file.size > 100000000) {
          console.log('File size must be less than 100000kb');
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

    if (!imageVideo) {
      console.log("No file selected");
      return;
    }

    try {
      // Start the upload process
      await uploadMedia(imageVideo);
      // The document will be added once the URL is ready in useEffect below
    } catch (err) {
      console.log("Error during upload:", err.message);
    }
  };

  // useEffect to wait for url and path to be set before adding the document
  useEffect(() => {
    if (urls && paths)    {
      // Prepare document to be added
      const doc = {
      uid: uid,
      username: displayName,
      photoURL: photoURL,
      imageURL: urls, // Use the uploaded image URL
      imagePath: paths, // Use the file path
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
          setImageVideo(null);
          setTitle('');
          setDescription('');
          props.onHide(); // Close the modal
        })
        .catch((err) => {
          console.log("Error adding document:", err.message);
        });
    }
  }, [urls, paths]); // This effect runs when url and path are updated

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
            value={title}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Description</Form.Label>
            <Form.Control  
            type="text" 
            placeholder="Description..." 
            onChange={(e) => setDescription(e.target.value)} 
            value={description}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image/Video</Form.Label>
            <Form.Control  type="file" multiple placeholder="Image..." onChange={handlePost} />
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