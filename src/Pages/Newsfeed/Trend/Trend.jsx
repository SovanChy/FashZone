import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { PostsAPI } from "./Posts";
import useTimestampFormat from "../../../Hook/useTimeStampFormat";
import { useNavigate } from "react-router-dom";

export default function Trend() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatTimestamp } = useTimestampFormat();

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const trendingPosts = await PostsAPI.getTrendingPosts(10);
        const filteredPosts = trendingPosts.filter(post => 
          post.imagePath?.[0]?.includes("image") || 
          post.imagePath?.[0]?.includes("video")
        );
        setPostList(filteredPosts);
        console.log(postList)
        setLoading(false); // Set loading to false after successful fetch
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchTrendingPosts();
    
    // Set up interval for periodic updates
    const intervalId = setInterval(fetchTrendingPosts, 5 * 60 * 1000);
    
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array for running effect only once on mount

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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="display-6">Trending</h2>
        </Col>
      </Row>

      <Row xs={1} md={2} className="g-4">
        {postList?.map((post) => (
          <Col key={post.id}>
            <Card>
              <Card.Body>
                {post.imagePath?.[0]?.includes("image") ? (
                  <div
                    role="button"
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        backgroundColor: "#000000",
                      }}
                      src={post.imageURL?.[0]}
                      alt={`Post ${post.id}`}
                    />
                  </div>
                ) : (
                  <video
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      backgroundColor: "#000000",
                      cursor: 'pointer'
                    }}
                    controls
                  >
                    <source src={post.imageURL?.[0]} type="video/mp4" />
                    <source src={post.imageURL?.[0]} type="video/ogg" />
                    <source src={post.imageURL?.[0]} type="video/webm" />
                    Your browser doesn't support this video tag.
                  </video>
                )}
                <p className="text-muted mt-2">
                  {formatTimestamp(post.createdAt)}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}