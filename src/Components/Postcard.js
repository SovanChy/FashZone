import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Heart, Eye, Send } from 'lucide-react';
import './Postcard.scss'
import ListGroup from 'react-bootstrap/ListGroup';


 export default function Postcard() {
  return (
    <>
      <Card className='mb-5 rounded-0' style={{ width: '40rem' }}>
      <Card.Body>
       <div style={{display: 'flex', justifyContent: 'space-between'}}> 
        <Card.Title className='mb-2'>Username</Card.Title>
        <i class="bi bi-three-dots"></i>
     </div>
        <Card.Img src="https://placehold.co/600x500"/>
        <div className='Like'>
            <i class="bi bi-eye"> 129312310</i>
            <i class="bi bi-hand-thumbs-up"> 2342423</i>
            <i class="bi bi-share"></i>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <ListGroup className="list-group-flush">
            <ListGroup.Item className='comment'>
                <span>Comment</span>
            </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
    </>
  )
};

