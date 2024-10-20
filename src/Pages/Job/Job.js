
import React from 'react';
import { Button, Container, Row, Col, Card, NavLink, NavItem,Carousel,Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Job.css';
import fancy from './image/fancy.jpg';
import Nike from './image/Nike.png';
import remade from './image/remade.JPG';
import neary from './image/neary_fashion.png';
import onitsuka from './image/Onitsuka .jpg';
import zara from './image/zara.jpg';

const Job = () => {
  const jobs = [
        {
          title: 'Color Designer',
          company: 'Nike',
          salary: 'Negotiate',
          location: 'Phnom Penh',
          description: 'Plan and execute color designs and strategize use of palettes across a wide range of product. ',
          logo: Nike ,
        },
        {
          title: 'Stylist Intern',
          company: 'Neary_Fashion',
          salary: 'Up to $200',
          location: 'Phnom Penh',
          description: 'Stylists curate outfits and looks for clients, photoshoots, or fashion shows. They work closely with designers, photographers, and models to ensure the vision of a brand or project is realized through clothing and accessories.',
          logo: neary ,
        },
        {
          title: 'Sustainability Officer',
          company: 'Remade Cambodia',
          salary: 'Negotiate',
          location: 'Phnom Penh',
          description: 'Join Remade Cambodia as a Sustainability Officer, focusing on integrating sustainable practices into our production and operations. You will work on initiatives to reduce environmental impact and promote ethical sourcing throughout the supply chain.',
          logo: remade ,
        },
        {
          title: 'Foot Wear',
          company: 'Onitsuka Tiger',
          salary: '$1000',
          location: 'Phnom Penh',
          description: 'Designing a new modern foot wear that fit with GenZ. ',
          logo: onitsuka ,
        },
        {
          title: 'Junior Pattern Maker',
          company: 'Fancy Tailor',
          salary: ' Entry-Level',
          location: 'Phnom Penh',
          description: 'You will assist in developing patterns under the guidance of senior designers. This role offers a fantastic opportunity to gain experience in high-end fashion.',
          logo: fancy,
        },
        {
          title: 'Freelane Designer',
          company: 'Zara ',
          salary: 'Project-based',
          location: 'Remote',
          description: 'Zara is hiring a Freelance Pattern Maker for specific projects. In this role, you will create patterns based on unique client specifications. Flexibility and creativity are key as you adapt to various design briefs.',
          logo: zara ,
        },

      ];
  return (
    <Container className="mt-5">
    <div className="container-fluid main-container">
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-md-4 text-section">
          <h1>Opportunities.<br/> Vacancies.<br/> Openings.</h1>
          <div className="input-section">
            <input type="text" placeholder="Find your passion" />
            <button className="search-button">Search</button>
          </div>
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
        </div>
        {/* Auto-sliding Carousel */}
        <div className="col-md-8">
          <Carousel fade controls={false} interval={2000}>
            <Carousel.Item>
              <div className="carousel-item-image">
                <img src={remade}/>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-item-image">
                <img src={fancy}/>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-item-image">
                <img src={Nike}/>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-item-image">
                <img src={onitsuka}/>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
       <Row>
       <Col>
        {jobs.map((job, index) => (
           <>
           <Card className="mb-4" key={index}>
             <Card.Body className="d-flex align-items-center">
              <img
                src={job.logo}
               className="img-fluid rounded me-3"
                 style={{ width: '120px', height: '120px' }} 
               />
                <Card.Text>
                <strong>Title:</strong>{job.title}<br />
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
