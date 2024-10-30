import React from 'react'
import { useState, useEffect, useCallback} from 'react';

//custom hooks
import { useFirestore } from '../../Hook/useFirestore';
import { useStorage } from '../../Hook/useStorage';

//library 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Spinner, Col } from 'react-bootstrap';


export default function ProfileEditForm({ profile, setForm }) {
    const { updateDocument, response } = useFirestore("users");
    const { uploadMedia, urls, paths } = useStorage("users");
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [occupations, setOccupations] = useState('');
    const [profileImage, setProfileImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const id = typeof profile === "object" && profile !== null ? profile.id : profile;
    console.log(profile);

    useEffect(() => {
        if (profile) {
            setDescription(profile.description || "");
            setOccupations(profile.occupations || "");
        }
    }, [profile]);

    // React Quill format
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link"],
                ["clean"],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
            ],
        },
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "color",
        "background",
        "font",
        "size",
    ];

    const handleChange = useCallback((value, delta, source, editor) => {
        setDescription(value);
    }, []);

    // Handle uploading Profile Image
    const handlePostProfile = (e) => {
        let selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.includes("image")) {
            alert("The selected file must be an image");
            return;
        }

        if (selectedFile.size > 20000000) {
            // 20MB limit
            alert("File size must be less than 20MB");
            return;
        }

        setProfileImage([selectedFile]);
    };

    // Handle uploading data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (profileImage.length > 0) {
                await uploadMedia(profileImage);
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
                        description: description,
                        occupations: occupations, 
                    };

                    if (urls.length > 0 && paths.length > 0) {
                        updateData.imageURL = urls;
                        updateData.imagePath = paths;
                    }

                    updateDocument(id, updateData);
                    setProfileImage([]);
                    setDescription({ ops: [] }); // Reset to empty Delta
                    setIsSubmitted(false);
                    setIsLoading(false);
                    setForm(false);
                }
            } catch (err) {
                alert("Error adding document:", err.message);
                console.log(response);
                setIsLoading(false);
            }
    

    }, [isSubmitted, urls, paths]);

    return (
        <Container fluid className='mb-5'>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="mt-5">Edit Profile</h1>
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='formOccupation'>
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control 
                                tyle="text"
                                 onChange={(e) => setOccupations(e.target.value)}
                                 value={occupations} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <div style={{ height: '300px', marginBottom: '50px' }}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={description}
                                        onChange={handleChange}
                                        style={{ height: '250px' }}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMedia">
                                <Form.Label>Image/Video (optional)</Form.Label>
                                <Form.Control type="file" onChange={handlePostProfile} />
                            </Form.Group>
                            <Button variant="danger" className='custom-button me-2' type="submit">
                                Submit
                            </Button>
                            <Button variant="danger" className='custom-button me-2' onClick={() => navigate('/article')}>
                                Close
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
