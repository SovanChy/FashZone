import React from "react";
import styles from "./NewsSection.module.css";
import { Spinner, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { ArticlesAPI } from "./ArticlesTrending";
import { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../Hook/useFirestore";
import { projectAuth, projectFirebase, firebase } from "../../firebase/config";


function ArticleCard() {
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {updateDocument} = useFirestore("Article");
  const navigate = useNavigate();

  // Handle view function
  const handleView = (e, id) => {
    e.preventDefault();
    const userId = projectAuth.currentUser.uid;
    const userViewedField = `views.${userId}`;
    const docRef = projectFirebase.collection("Article").doc(id);

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
        const trendingPosts = await ArticlesAPI.getTrendingArticles(4);
        const filteredPosts = trendingPosts.filter(post =>
          post.imagePath?.[0]?.includes("image") ||
          post.imagePath?.[0]?.includes("video")
        );
        setArticlesList(filteredPosts);
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
    <Container>
      <Row>
        {articlesList && articlesList.map((article) => (
          <Col lg={6} md={6} key={article.id} className="mb-4">
            <Card 
            onClick={(e) => { 
              handleView(e, article.id)
              navigate(`/article/${article.id}`)
            }}
              style={{
              height: "700px",
              cursor: "pointer"
            }}>
              <Card.Img variant="top" src={article.imageURL} alt="img" style={{
              height: "400px",
              objectFit: "cover",
                objectPosition: "center"
              }}
            />
              <Card.Body>
                <Card.Title style={{
                  color: "#800000",
                  fontWeight: "bold"
                  }}>{article.title}</Card.Title>
                <Card.Text className={styles.articleExcerpt}>
                  <ReactQuill
                    theme="bubble"
                    value={article.description}
                    readOnly={true}
                    modules={{ toolbar: false }}
                    className="!border-none no-scroll"
                  />
                </Card.Text>
                <Card.Footer style={{
                  backgroundColor: "#800000",
                  color: "white"
                }}>
                  <h5>Written by {article.displayName}</h5>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArticleCard;