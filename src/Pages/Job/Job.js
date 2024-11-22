import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Carousel, Spinner, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Job.css';
import fancy from './image/fancy.jpg';
import Nike from './image/Nike.png';
import remade from './image/remade.JPG';

// import Onitsuka from './image/Onitsuka.jpg';
import { useFirestore } from '../../Hook/useFirestore';
import { useCollection } from '../../Hook/useCollection';
import { useNavigate } from 'react-router-dom';
import useTimestampFormat from '../../Hook/useTimeStampFormat';

const Job = () => {
  const { documents, error } = useCollection("Job", ["createdAt", "desc"]);
  const navigate = useNavigate();
  const { updateDocument, deleteDocument, response } = useFirestore("Job");
  const { formatTimestamp } = useTimestampFormat();

  // Error handling
  const [isLoading, setIsLoading] = useState(true);
  const [displayError, setDisplayError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Delete
  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      deleteDocument(id);
    } catch {
      alert(response.error);
    }
  };

  useEffect(() => {
    if (documents) {
      setIsLoading(false);
    }
  }, [documents]);

  if (isLoading) {
    return (
      <Container className="m-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (displayError) {
    return (
      <Container className="m-5">
        <div>Error: {displayError}</div>
      </Container>
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocuments = documents ? documents.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = documents ? Math.ceil(documents.length / itemsPerPage) : 1;

  return (
    <Container className="mt-5">
      <div className="container-fluid main-container">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-md-4 text-section">
            <h1>Opportunities.<br /> Vacancies.<br /> Openings.</h1>
            <div className="button-container w-100">
              <LinkContainer to="/Job">
                <Button className="job-button w-40">Job</Button>
              </LinkContainer>
              <LinkContainer to="/Portfolio">
                <Button className="portfolio-button w-40">Portfolio</Button>
              </LinkContainer>
            </div>
          </div>
                <div className="col-md-8">
                <Carousel fade controls={false} interval={2000}>
                  <Carousel.Item>
                  <div className="carousel-item-image">
                    <img src={remade} alt="Remade" />
                  </div>
                  </Carousel.Item>
                  <Carousel.Item>
                  <div className="carousel-item-image">
                    <img src={fancy} alt="Fancy" />
                  </div>
                  </Carousel.Item>
                  <Carousel.Item>
                  <div className="carousel-item-image">
                    <img src={Nike} alt="Nike" />
                  </div>
                  </Carousel.Item>
                </Carousel>
                </div>
              </div>
              </div>
              <Row>
              <Col>
                <div className="d-flex justify-content-end mb-2">
                <Button className="custom-button" onClick={() => navigate(`/jobForm`)}>
                  Create
                </Button>
                </div>
                {currentDocuments.map((job, index) => (
                <Card className="card-job mb-4" key={index}>
                  <Card.Body className="d-flex align-items-center">
                  <img
                    src={job.imageURL}
                    className="img-fluid rounded me-3"
                    alt="Company Logo"
                    style={{ width: '120px', height: '120px' }}
                  />
                  <Card.Text className='mt-3'>
                    <strong>Title:</strong> {job.title}<br />
                    <strong>Company:</strong> {job.company}<br />
                    <strong>Salary:</strong> {job.salary}<br />
                    <strong>Location:</strong> {job.location}<br />
                    <strong>Deadline:</strong> {job.deadline ? `${new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : "No date" }
                  </Card.Text>
                    <Button className="ms-auto custom-button"onClick={(e) => {handleDelete(e, job.id)}}>Delete</Button>
                  <LinkContainer to={`/view/${job.id}`}>
                    <Button className="custom-button">View</Button>
                  </LinkContainer>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Pagination className="custom-pagination mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Job;
