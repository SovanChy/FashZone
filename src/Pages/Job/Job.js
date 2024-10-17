
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card, NavLink, NavItem,Carousel,Image } from 'react-bootstrap';
import './Job.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import nikeLogo from '../image/nike .png';
import addidas from'../image/addidas.png';
import fancy from '../image/fancy.jpg';

const Job = () => {
  
  const jobs = [
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'nikeLogo ',
    },
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'addidas',
    },
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'fancy.jpg',
    },
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s',
    },
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s',
    },
    {
      title: 'Pattern Maker',
      company: 'Gucci',
      salary: 'Negotiate',
      location: 'Remote',
      description: 'Responsible for making pattern for client',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s',
    },
  ];



  return (
    <Container className="mt-5">
      <h1 className="mt-3">Job Listings</h1>
      {/* Carousel for Banner Images */}
    <Row>
      <Col>
        <Carousel>
          <Carousel.Item>
            <Image
              src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg"
              alt="Banner 1"
              fluid
              style={{ height: '500px', width: '1000px' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="https://bongsrey.sgp1.digitaloceanspaces.com/library/937/images/LogoZandoblack.jpg"
              alt="Banner 2"
              fluid
              style={{ height: '500px', width: '1000px' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png"
              alt="Banner 3"
              fluid
              style={{ height: '500px', width: '1000px' }}
            />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
    <Row className="mb-4">
        <Col>
        <div class="button-container">
        <LinkContainer to="/Job">
              <Button className="job-button">
                Job 
              </Button>
          </LinkContainer>
          <LinkContainer to="/Portfolio">
               <Button className="portfolio-button">
                Portfolio 
               </Button>
          </LinkContainer>
        </div>
        </Col>
      </Row>
      <Row>
      <Col>
        {jobs.map((job, index) => (
          <>
          <Card className="mb-4" key={index}>
            <Card.Body className="d-flex align-items-center">
              <img
                src={job.logo}
               // alt={`${job.company} logo`}
                className="img-fluid rounded me-3"
                style={{ width: '120px', height: '120px' }} 
              />
               <Card.Text>
                <strong>Title</strong>{job.title}<br />
                <strong>Company:</strong> {job.company}<br />
                  <strong>Salary:</strong> {job.salary}<br />
                  <strong>Location:</strong> {job.location}<br />
                  <strong>Description:</strong> {job.description}
                </Card.Text>

                <LinkContainer to="/view">
                <Button className="view-button">
                  View More
                </Button>
                </LinkContainer>
              </Card.Body>
            </Card>
            </>
          ))}
        </Col>
      </Row>
    </Container>
  
  );
};

export default Job;
// //<Card.Title>{job.title} at {job.company}</Card.Title>



// import React from 'react';
// import { Button, Container, Row, Col, Card, Badge, Image } from 'react-bootstrap';
// import{ LinkContainer } from 'react-router-bootstrap';

// const JobCard = ({ jobTitle, company, location, vacancies, experience, type,logo }) => (
//   <Container className='job-container'>
//   <Card className="job-card">
//         <Card.Body>
//         <Col md={3}c lassName="d-flex align-items-center">
//       <img  className="logo-img" 
//         src={logo} 
//         alt={`${company} Logo`}
       
//       />
//     </Col>
//     <Col md={10} className='detail'>
//       <Card.Title className="font-weight-bold">{jobTitle}</Card.Title>
//       <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
//       <div className="mb-2">
//         <span>{location}</span> • <span>{vacancies} Vacancies</span>
//       </div>
//       <div className="badge-container mb-6">
//         <Badge className="badge">{experience}</Badge>
//         <Badge className="badge">Full Time</Badge>
//      </div>
//       <div className="view-more-btn">
//         <LinkContainer to="/view">
//             <Button className="view-button">
//                 View More
//             </Button>
//         </LinkContainer>
//       </div>
//      </Col>
//     </Card.Body>
//   </Card>
//   </Container>
// );

// const Job = () => (
//   <Container>
//     <Row>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//       <Col md={4}>
//         <JobCard
//           jobTitle="Pattern Maker"
//           company="Fancy Tailor"
//           location="Phnom Penh"
//           vacancies="1"
//           experience="1 year up"
//           type="Fabric"
//           logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8foYKoAsATnMJrzAJHg8KNYYl3Wb9d4mZA&s"
//         />
//       </Col>
//     </Row>
//   </Container>
// );

// export default Job;
