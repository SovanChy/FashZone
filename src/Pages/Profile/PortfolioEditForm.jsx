import React from 'react'
import { useState, useEffect } from 'react';

//custom hooks
import { useFirestore } from '../../Hook/useFirestore';
import { useStorage } from '../../Hook/useStorage';

//library 
import 'react-quill/dist/quill.snow.css';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { projectFirebase } from '../../firebase/config';


export default function ProfileEditForm({ portfolio, idPort,  onHide, show}) {
  const { updateDocument, getDocument, response } = useFirestore("users");
  const { uploadMedia, urls, paths } = useStorage("users");
  const [portfolioImages, setPorfolioImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //handle Portfolio images
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
      if (!file.type.includes('image')) {
        alert("A selected file must be an image");
        return false;
      }
      if (file.size > 100000000) {
        alert('File size must be less than 100MB');
        return false;
      }
      return true;
    });
  
    setPorfolioImages(validFiles);
    };

  // Handle uploading data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (portfolioImages.length > 0) {
        await uploadMedia(portfolioImages);
      }
      setIsSubmitted(true);
    } catch (err) {
      alert("Error during upload:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updatePortfolio = async () => {
      try {
        if (isSubmitted) {
          const updateData = {
            portfolioURL: urls, 
            portfolioPath: paths,
            id: Math.random()
          };
          const ref = await projectFirebase.collection("users").doc(idPort)
          const doc = await ref.get();
          let updatedPortfolioURL = [];

          if (doc.exists && doc.data().portfolioURL) {
            updatedPortfolioURL = [...doc.data().portfolioURL, updateData];
          } else {
            updatedPortfolioURL = [updateData];
          }

          await updateDocument(idPort, {
            portfolioURL: updatedPortfolioURL
          });

          setPorfolioImages([]);
          setIsSubmitted(false);
          setIsLoading(false);
          onHide();
        }
      } catch (err) {
        alert("Error adding document:", err.message);
        console.log(err);
        setIsLoading(false);
      }
    };

    updatePortfolio();
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
        Add Portfolio
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
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Portfolio</Form.Label>
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
