import React from "react";
import styles from "./NewsSection.module.css";
import { Spinner, Alert, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { BlogAPI } from "./BlogTrending";
import { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../Hook/useFirestore";
import { projectAuth, projectFirebase, firebase } from "../../firebase/config";

function BlogCard() {
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {updateDocument} = useFirestore("Blog");
    const navigate = useNavigate();

    // Handle view function
    const handleView = (e, id) => {
        e.preventDefault();
        const userId = projectAuth.currentUser.uid;
        const userViewedField = `views.${userId}`;
        const docRef = projectFirebase.collection("Blog").doc(id);

        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (!data.views || !data.views[userId]) {
                        updateDocument(id, {
                            [userViewedField]: true,
                            viewsBy: firebase.firestore.FieldValue.arrayUnion(userId),
                            view: firebase.firestore.FieldValue.increment(1),
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error handling view:", error);
            });
    };

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                const trendingPosts = await BlogAPI.getTrendingArticles(4);
                const filteredPosts = trendingPosts.filter(post =>
                    post.imagePath?.[0]?.includes("image") ||
                    post.imagePath?.[0]?.includes("video")
                );
                setBlogList(filteredPosts);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTrendingPosts();
        
        // Set up interval for periodic updates
        const intervalId = setInterval(fetchTrendingPosts, 5 * 60 * 1000);
        
        // Cleanup function
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="mt-5">
            <Row>
                <Col>
                    <ListGroup>
                        {blogList && blogList.map((blog) => (
                            <ListGroup.Item 
                                key={blog.id} 
                                action 
                                onClick={(e) => { 
                                    handleView(e, blog.id);
                                    navigate(`/blog/${blog.id}`);
                                }}
                                className="mb-4"
                            >
                                <Card style={{ cursor: "pointer", height: "400px" }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Card.Img variant="top" src={blog.imageURL} alt="img" style={{
                                            width: "50%",
                                            height: "400px",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            overflow: "hidden"
                                        }} />
                                        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: "50%" }}>
                                            <div>
                                                <Card.Title style={{
                                                    color: "#800000",
                                                    fontWeight: "bold",
                                                    fontSize: "26px"
                                                }}>{blog.title}</Card.Title>
                                                <Card.Text className={styles.articleExcerpt}>
                                                    <ReactQuill
                                                        theme="bubble"
                                                        value={blog.description}
                                                        readOnly={true}
                                                        modules={{ toolbar: false }}
                                                        className="!border-none no-scroll"
                                                    />
                                                </Card.Text>
                                            </div>
                                            <Card.Footer style={{
                                                backgroundColor: "#800000",
                                                color: "white"
                                            }}>
                                                <h5>Written by {blog.displayName}</h5>
                                            </Card.Footer>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default BlogCard;