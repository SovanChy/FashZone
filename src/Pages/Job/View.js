import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import './Job.css';
export default function View() 
{
    const jobs = [
        {
          title: 'Pattern Maker',
          company: 'Gucci',
          salary: 'Negotiate',
          location: 'Remote',
          description: 'Responsible for making pattern for client',
          logo: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg',
        },
    ];

    return(
        <Container className="mt-5">
            {/* <h1 className="mt-3">Job Details</h1>
            <Row className="mb-4">
            <Col className="button-container">
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
            </Col>
            </Row> */}

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

            {/* Job List */}
            <Row className="mt-4">
            <Col>
                {jobs.map(({ title, company, salary, location, description, logo }, index) => (
                <div className="mb-4" key={index}>
                    <div className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt={`${company} logo`}
                        className="img-fluid rounded me-3"
                    />
                    <div>
                        <strong>Title: </strong>{title}<br />
                        <strong>Company: </strong>{company}<br />
                        <strong>Salary: </strong>{salary}<br />
                        <strong>Location: </strong>{location}<br />
                        <strong>Description: </strong>{description}
                    </div>
                    </div>
                </div>
                ))}
            </Col>
            </Row>
            <Row className="mt-5">
            <Col>
                <h3 className="who-looking-for">Who We're Looking For</h3>
                <p>We’re looking for an Expert Color Designer for ACG Apparel. If this is you, you'll work with the Color Design Director to plan and execute color designs and strategize use of palettes across a wide range of product. Working collaboratively with Design, Product Management, Merchandising, Sports Marketing, and Tech Development, you will create focused solutions for success. You will research and design for our most elite athletes and consumers, in our most energetic sports and fields of play.</p>
                <ul>
                <li> Bachelor’s Degree in Design or related field or equivalent combination of relevant education, experience, and training.</li>
                <li>Minimum 8 years in technically challenging color design experience.</li>
                <li>Experience in technical outerwear build and construction, trim details, etc.</li>
                <li>Experience in technical sportswear, tops, bottoms, base layer, etc.</li>
                <li>Experience in color design for outerwear, sportswear, and base layer.</li>
                <li>Ability to understand challenges or underlying concerns, share ideas and develop effective responses or elevate to higher management.</li>
                </ul>
            </Col>
            </Row>
            <Row className="mt-5">
            <Col>
                <h3 className="who-looking-for">What You Will Work On</h3>
                <p>As our Expert Color Designer, you will develop color palettes to inform seasonal narratives and inspire iconic color for the ACG Apparel line, including: </p>
            <ul>
                <li>Build strong presentation tools and visuals.</li>
                <li>Color line art to detail the creation of each product.</li>
                <li>Demonstrate a sophisticated knowledge and practice of all phases of product execution.</li>
                </ul>
            </Col>
            </Row>
        </Container>
    )
}
