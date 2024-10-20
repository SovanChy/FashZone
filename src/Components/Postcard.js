import React from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useCollection } from '../Hook/useCollection';

export default function Postcard() {
  const { documents, error } = useCollection('MediaPost');

  // Helper function to format the timestamp
   // Helper function to format the timestamp
   const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day} ${month} ${year} at ${hours}:${minutes}`;
    }
    return 'No date available';
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!documents) {
    return <div>Loading...</div>;
  }

  return (
          <>
          {documents && documents.map((doc) => (
            <Card style={{width: "600px"}} key={doc.id} className='mb-5 rounded-0'>
              <Card.Body>
                <div className="d-flex  align-items-center mb-2">
                  {/* username */}
                  <img
                          src={doc.photoURL}
                          alt="User Avatar"
                          className="rounded-circle me-3"
                          style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                          }}
                        />
                  <Card.Title>{doc.username}</Card.Title>
                  <i className="bi bi-three-dots ms-auto"></i>
                </div>
                <p>{formatTimestamp(doc.createdAt)}</p>                
                <Card.Img variant="top" src="https://placehold.co/600x400" className="mb-3"/>
                <div className='d-flex gap-2 mb-3'>
                  <i className="bi bi-hand-thumbs-up"> {doc.like}</i>
                  <i className="bi bi-eye"> {doc.view}</i>
                  <i className="bi bi-share ms-auto"></i>

                </div>
                <Card.Title>{doc.title}</Card.Title>
                <Card.Text>{doc.description}</Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <span>Comment</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )

          )}
      </>
  );
}