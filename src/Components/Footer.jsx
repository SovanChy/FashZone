import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function Footer() {
    return (
    <Container fluid > 
        <Row className="d-flex flex-column p-5 bg-dark text-white">
            <Col className='d-flex flex-shrink justify-content-center mb-4'>

               <a href="https://react-bootstrap.netlify.app/docs/getting-started/theming" style={{
                color: "white",
               }}><Icon.Google size={40}></Icon.Google></a>
            </Col> 
            <Col className='mx-3 px-5 w-100'>
                <div className='d-flex justify-content-center'>
                 <p className='text-center fs-5 w-50'>Lorem ipsum dolor sit amet consectetur. Orci aliquam nibh at ut. Et eget enim aliquam velit. Nulla mi semper egestas gravida nunc. Tellus eu ornare vestibulum pellentesque lectus leo ultrices. In tempus turpis amet id sit sollicitudin fames vitae nam.  </p>
                 </div>
            </Col>
            <Col className='flex-column'>
                    <h1 className='m-2 text-center'>FashZone</h1>
            </Col>
        </Row>
    </Container>
    )
}