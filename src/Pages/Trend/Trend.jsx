import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { PostsAPI } from "./Posts";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import {  useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hook/useAuthContext";
import { projectFirebase, projectAuth, firebase } from "../../firebase/config";
import { useFirestore } from "../../Hook/useFirestore";

export default function Trend() {
  const  {user } = useAuthContext()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatTimestamp } = useTimestampFormat();
  const {updateDocument} = useFirestore("MediaPost")

   // Handle view function
   const handleView = (e, id) => {
    e.preventDefault();
    const userId = projectAuth.currentUser.uid;
    const userViewedField = `views.${userId}`;
    const docRef = projectFirebase.collection("MediaPost").doc(id);

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
        setLoading(true);
        const trendingPosts = await PostsAPI.getTrendingPosts(10);
        //add data to posts
        setPosts(trendingPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingPosts();
    const interval = setInterval(fetchTrendingPosts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
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
    <>
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="display-6">Trending</h2>
          </Col>
        </Row>

        <Row xs={1} md={2} className="g-4">
          {posts.map((post) => (
            <Col key={post.id}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                  <h5 className="mb-0">{post.title}</h5>
                  <Badge bg="light" text="dark">
                    Score: {post.trendingScore.toFixed(2)}
                  </Badge>
                </Card.Header>

                <Card.Body>
                <a
                             onClick={(e) => {
                              navigate(`/post/${post.id}`);
                              handleView(e, post.id);
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                              <Card.Img
                                variant="top"
                                style={{
                                  width: "100%",
                                  height: "100%", // Set height to 800px
                                  objectFit: "cover",
                                  backgroundColor: "#000000", // Ensure the background is white
                                }}
                                src={post.imageURL[0]}
                              />
                            </a>
                  <Card.Text>{post.description}</Card.Text>

                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3 text-muted">
                      <span>
                        <i className="bi bi-heart me-1" />
                        {post.like}
                      </span>
                      <span>
                        <i className="bi bi-eye me-1"></i>
                        {post.view}
                      </span>
                    </div>

                    <p className="text-muted">
                      {formatTimestamp(post.createdAt)}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* <Container fluid>
        <Row>
          <Col
            sm={12}
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh", objectFit: "cover" }}
          >
            <div className="bg-dark text-white w-100 vh-90 d-flex align-items-center justify-content-center">
              <h2
                style={{
                  display: "flex",
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                  transform: "rotate(270deg)",
                  height: "79.20vh",
                  justifyContent: "center",
                  fontSize: "240px",
                  fontSize: "clamp(100px, 10vw, 240px)"
                }}
              >
                Top
              </h2>
            </div>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh" }}
          >
            <Image
              src="../../image/4.jpg"
              alt="image2"
              className="w-100"
              style={{ height: "80vh", objectFit: "cover"}}
            />
          </Col>
        </Row>
      </Container>

   

      <Container fluid className="d-flex flex-column flex-md-row">
      <Col xs={12} md={9}  className="h-100 p-0">
        <Row className="h-100 g-2 py-0 pe-2">
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/5.jpg"
              alt="Street fashion couple"
              className="w-100"
              style={{ height: '50vh', objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/1.jpg"
              alt="Bohemian style dress"
              className="w-100"
              style={{height: '50vh',  objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/4.jpg"
              alt="Blonde model in light outfit"
              className="w-100 h-100"
              style={{ height: '50vh',objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/3.jpg"
              alt="Model in cream suit"
              className="w-100 h-100"
              style={{ height: '50vh', objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={3} className="p-0 order-first order-md-last">
        <div className="bg-dark text-white w-100 h-100 d-flex align-items-center justify-content-center">
          <h2
            style={{
              writingMode: "vertical-lr",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "200px",
              fontSize: "clamp(100px, 10vw, 240px)"
            }}
          >
            Trending
          </h2>
        </div>
      </Col>
    </Container>

    <Container fluid>
        <Row className="mt-5">
          <Col
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh",  objectFit: "cover" }}
          >
            <Image
              src="../image/1.jpg"
              alt="image1"
              className="w-100"
              style={{ height: "80vh",  objectFit: "cover"}}
            />
          </Col>
          <Col
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh" }}
          >
            <Image
              src="../../image/2.jpg"
              alt="image2"
              className="w-100"
              style={{ height: "80vh", objectFit: "cover"}}
            />
          </Col>
        </Row>
      </Container>
      */}
    </>
  );
}
