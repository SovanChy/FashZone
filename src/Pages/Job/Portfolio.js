
import React from 'react';
import { Button, Container, Row, Col, Card, Badge, Image } from 'react-bootstrap';
import{ LinkContainer } from 'react-router-bootstrap';

const JobCard = ({ jobTitle, company, location, vacancies, experience, type,logo }) => (
    
  <Container className='job-container'>
  <Card className="job-card">
        <Card.Body>
        <Col md={3}c lassName="d-flex align-items-center">
      <img  className="logo-img" 
        src={logo} 
        alt={`${company} Logo`}
       
      />
    </Col>
    <Col md={10} className='detail'>
      <Card.Title className="font-weight-bold">{jobTitle}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
      <div className="mb-2">
        <span>{location}</span> • <span>{vacancies} Vacancies</span>
      </div>
      <div className="badge-container mb-6">
        <Badge className="badge">{experience}</Badge>
        <Badge className="badge">Full Time</Badge>
     </div>
      <div className="view-more-btn">
        <LinkContainer to="/view">
            <Button className="view-button-portfolio">
                View More
            </Button>
        </LinkContainer>
      </div>
     </Col>
    </Card.Body>
  </Card>
  </Container>
);

const Portfolio = () => (
  <Container>
    <Row>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
      <Col md={4}>
        <JobCard
          jobTitle="Pattern Maker"
          company="Fancy Tailor"
          location="Phnom Penh"
          vacancies="1"
          experience="1 year up"
          type="Fabric"
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
        />
      </Col>
    </Row>
  </Container>

  
);


export default Portfolio;