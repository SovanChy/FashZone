import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function Footer() {
    return (
    <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="d-flex flex-column p-5 bg-black text-white mt-auto">
            <Col className='d-flex flex-shrink justify-content-center mb-4'>
            <div>
               <Icon.Google size={40} className="ms-4"> </Icon.Google>
            </div>
            <div>
               <Icon.Instagram size={40} className="ms-4"> </Icon.Instagram>
            </div>

            <div>
               <Icon.Pinterest size={40} className="ms-4"> </Icon.Pinterest>
            </div>
            </Col> 
            <Col className='mx-3 px-5 w-100'>
                <div className='d-flex justify-content-center'>
                 <p className='text-center fs-5 w-50 '> About Us
                 At FashionZone, we believe in empowering individuals through style. Our curated collections bring together the latest trends and timeless pieces to help you express your unique personality. </p>
                 </div>
            </Col>
            <Col className='flex-column'>
                    <h1 className='m-2 text-center ms-5'>FashionZone</h1>
            </Col>
        </Row>
    </Container>
    )
}