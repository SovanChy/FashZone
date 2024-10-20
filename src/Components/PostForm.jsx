import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useFirestore } from '../Hook/useFirestore';
import { useAuthContext} from '../Hook/useAuthContext';


function PostForm(props) {
  const {user} = useAuthContext()
  const { addDocument} = useFirestore('MediaPost')
  const { uid, displayName, photoURL } = user
  

  //add like, views, share, and comment
    const [imageVideo, setImageVideo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('') 
    const [like, setLike] = useState(0)
    const [view, setView] = useState(0)
    const [share, setShare] = useState('')

    const doc ={
      uid: uid,
      username: displayName, 
      photoURL: photoURL,
      imageVideo: imageVideo, 
      title: title, 
      description: description, 
      like: like, 
      view: view,
    } 


    const handlePost = (e) => {
        setImageVideo(null)
        let selected = e.target.files[0]
        if (!selected) { // ensure that it's not null
            setImageVideo("Please select a file");
            return;
          }
          // || !selected.type.includes('video')) 
          if (!selected.type.includes('image')) {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(doc)
        try{
        addDocument(doc)
        console.log("Document added successfully");
        }
        catch(err)
        {
          console.log(err.message)
          console.error("Error adding document:", err.message);
        }


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
            <Form.Control  type="file" placeholder="Image..." onChange={handlePost} />
          </Form.Group>
          <Button variant="danger" className='me-2' type="submit">
        Submit
      </Button>

          </Form>
          <Button variant="danger" onClick={props.onHide}>Close</Button>


      </Modal.Body>
    </Modal>
    </>
);
}

export default PostForm;