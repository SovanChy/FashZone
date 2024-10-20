
import React from 'react';
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import './Job.css';
import Sustainable4 from './image/substainable4.jpg';
import Sustainable2 from './image/substainable2.jpg';
import Sustainable3 from './image/substainable3.jpg';
import Menswear1 from './image/menwear1.jpg';
import Menswear2 from './image/menswear2.jpg';
import Menswear3 from './image/menswear3.jpg';
import hauteCouture1 from './image/hauteCouture1.jpg';
import hauteCouture2 from './image/hauteCouture2.jpg';
import hauteCouture3 from './image/hauteCouture3.jpg';
import Streetwear1 from './image/streetwear1.jpg';
import Streetwear2 from './image/streetwear2.jpg';
import Streetwear3 from './image/streetwear3.jpg';
import Wready1 from './image/Wready1.jpg';
import Wready2 from './image/Wready2.jpg';
import Wready3 from './image/Wready3.jpg';
import Accessories1 from './image/footwear1.jpg';
import Accessories2 from './image/Accessories1.jpg';
import Accessories3 from './image/Accessories2.jpg';
import { LinkContainer } from 'react-router-bootstrap';

const Portfolio = () => {
  const portfolio = [
    {
      name: 'Jesscia',
      specialization: 'Sustainable Fashion',
      profile: 'Eco-conscious designer blending innovative materials with timeless styles, focused on ethical production and reducing waste.',
      images: [Sustainable3, Sustainable4 ,Sustainable2 ],
      link: '', // link to profile page 
    },
    {
      name: 'William Smith',
      specialization: 'Menswear',
      profile: 'Acclaimed menswear designer known for sharp tailoring and bold colors, merging traditional craftsmanship with modern aesthetics.',
      images: [Menswear2, Menswear1,Menswear3 ],
      link: '', // link to profile page 
    },
    {
      name: 'Sofia Martinez',
      specialization: 'Haute Couture',
      profile: 'Luxury designer specializing in intricate, one-of-a-kind pieces inspired by art history and meticulous craftsmanship.',
      images: [hauteCouture1, hauteCouture2,hauteCouture3 ],
      link: '', // link to profile page 
    },
    {
      name: 'Sella ',
      specialization: 'Streetwear',
      profile: ' Urban-inspired designer creating vibrant, culturally infused streetwear that blends traditional elements with contemporary style.',
      images: [Streetwear2, Streetwear1,Streetwear3 ],
      link: '', // link to profile page 
    },
    {
      name: 'Reachany',
      specialization: 'Women s Ready-to-Wear',
      profile: 'Designer focusing on comfortable, stylish women s fashion, merging functionality with elegance in fluid silhouettes.',
      images: [Wready3, Wready2 ,Wready1 ],
      link: '', // link to profile page 
    },
    {
      name: 'Michael Thompson',
      specialization: 'Accessories and Footwear',
      profile: 'Innovative designer known for unique materials and cutting-edge technology in accessories and footwear, pushing design boundaries.',
      images: [Accessories1, Accessories3,Accessories2 ],
      link: '', // link to profile page 
    },
  ];

  return (
    
    <Container fluid className="portfolio-container">
       <Row>
        <Col>
          <h1 className="title-left">PORTFOLIO</h1>
        </Col>
        <Col>
           <h1 className="title-right">WORK</h1>
         </Col>
       </Row>
      <Row>
      {portfolio.map((portfolio, idx) => (
         <Col md={4} key={idx} className="mb-4">
            <Card className="portfolio-card">
             <Card.Body>
                <Row className="mb-2">
                  {portfolio.images.map((images, index) => (
                    <Col key={index} md={4} className="small-image-col">
                      <img className="small-image" src={images} alt={`Small image ${index + 1}`} />
                    </Col>
                  ))}
                </Row>
                <Card.Title>{portfolio.name}</Card.Title>
                <Card.Text>{portfolio.specialization}</Card.Text>
                <Card.Text>{portfolio.profile}</Card.Text>
                <a href={portfolio.link} className="read-more-link">Discover more →</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Portfolio;

