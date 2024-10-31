import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import './Job.css';
import { useDocument } from '../../Hook/useDocument';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirestore } from '../../Hook/useFirestore';

export default function View() {
    const {id} = useParams()
    const { document } = useDocument("Job", id);
    const navigate = useNavigate();
    const { deleteDocument, response } = useFirestore("Job");

    // Handle Delete
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            await deleteDocument(id);
            if (response.error) {
                alert("Error deleting document: " + response.error);
            } else {
                alert("Document deleted successfully.");
                navigate("/job"); // Redirect after deletion
            }
        } catch (error) {
            alert("An unexpected error occurred.");
        }
    };

    return (
        <Container className="mt-5">
            {document && (
                <>
                    <div className="d-flex align-items-center">
                        <i
                            className="bi bi-arrow-left-circle h1"
                            onClick={() => navigate("/job")}
                            style={{ cursor: "pointer" }}
                        ></i>
                        <div className="ms-auto">
                            <Button className="custom-button">Edit</Button>
                            <Button
                                className="custom-button"
                                onClick={(e) => handleDelete(e, document.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>

                    {/* Banner Image */}
                    <Row>
                        <Col>
                            <Image
                                src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg"
                                alt="Banner"
                                fluid
                                className="w-100"
                                style={{ height: '500px', objectFit: 'cover' }}
                            />
                        </Col>
                    </Row>

                    {/* Job Details */}
                    <Row className="mt-4">
                        <Col>
                            <div className="mb-4">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <strong>Title: </strong>{document.title}<br />
                                        <strong>Company: </strong>{document.company}<br />
                                        <strong>Salary: </strong>{document.salary}<br />
                                        <strong>Location: </strong>{document.location}<br />
                                        <strong>Description: </strong>{document.description}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Who We're Looking For */}
                    <Row className="mt-5">
                        <Col>
                            <h3 className="who-looking-for">Who We're Looking For</h3>
                            <p>We’re looking for an Expert Color Designer for ACG Apparel...</p>
                            <ul>
                                <li>Bachelor’s Degree in Design or related field...</li>
                                <li>Minimum 8 years in technically challenging color design...</li>
                                <li>Experience in technical outerwear build and construction...</li>
                            </ul>
                        </Col>
                    </Row>

                    {/* What You Will Work On */}
                    <Row className="mt-5">
                        <Col>
                            <h3 className="who-looking-for">What You Will Work On</h3>
                            <p>As our Expert Color Designer, you will develop color palettes...</p>
                            <ul>
                                <li>Build strong presentation tools and visuals.</li>
                                <li>Color line art to detail the creation of each product.</li>
                                <li>Demonstrate a sophisticated knowledge and practice...</li>
                            </ul>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}
