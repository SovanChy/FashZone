import React from "react";
import { Card, ListGroup, Carousel, Dropdown, DropdownMenu, DropdownToggle, Button} from "react-bootstrap";
import { useCollection } from "../Hook/useCollection";
import { useFirestore } from "../Hook/useFirestore";
import './Postcard.css'

export default function Postcard() {
  const { documents, error } = useCollection("MediaPost");
  const { updateDocument, deleteDocument} = useFirestore("MediaPost")


  //Edit and Delete function
  const handleDelete = (e, id) => {
    e.preventDefault()
    deleteDocument(id)
   
  }

  const handleEdit = (e) => {
    e.preventDefault()



  }
  // Helper function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInMs = now - date;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      } else {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes} at ${day} ${month} ${year}`;
      }
    }
    return "No date available";
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!documents) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {documents &&
        documents.map((doc) => (
          <Card
            style={{ maxWidth: "800px", border: "2px solid black" }}
            key={doc.id}
            className="mb-5 rounded-0"
          >
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                {/* username */}
                <img
                  src={doc.photoURL}
                  alt="User Avatar"
                  className="rounded-circle me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <Card.Title>{doc.username}</Card.Title>
              
              <Dropdown className="ms-auto">
                <DropdownToggle 
                  style={{
                    backgroundColor: "white",
                    borderColor:"white",
                    color: "black",
                    padding: "20px"}}>
                  <i className="bi bi-three-dots ms-auto" >  </i>
                </DropdownToggle>
                <DropdownMenu>
                  <Dropdown.Item as={Button} >Edit</Dropdown.Item>
                  <Dropdown.Item as={Button} onClick={(e) => handleDelete(e, doc.id)}>Delete</Dropdown.Item>
                </DropdownMenu>
               
                </Dropdown>
              </div>
              <p>{formatTimestamp(doc.createdAt)}</p>

              {Array.isArray(doc.imagePath) && doc.imagePath.length > 0 && (
                <div className="media-container" style={{ 
                  maxWidth: "600px", 
                  margin: "0 auto",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  marginBottom: "1rem" // Added to maintain spacing
                }}>
             
                  {doc.imagePath.length > 1 ? (
                    // Show carousel for multiple images/videos
                    <Carousel data-bs-theme="dark" style={{ height: "100%", width: "100%" }}  touch={false}  >
                      {doc.imagePath.map((path, index) => (
                        <Carousel.Item key={index} style={{ height: "100%" }}>
                          {path.includes("image") ? (
                            <a
                              href={doc.imageURL[index]}
                              target="_blank"
                              rel="noopener noreferrer"
                              
                            >
                              <Card.Img
                                variant="top"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  backgroundColor: "#f8f9fa" // Optional: adds light background
                                }}
                                src={doc.imageURL[index]}
                              />
                            </a>
                          ) : (
                            <video
                              controls
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                backgroundColor: "#f8f9fa" // Optional: adds light background
                              }}
                            >
                              <source src={doc.imageURL[index]} type="video/mp4" />
                              <source src={doc.imageURL[index]} type="video/ogg" />
                              <source src={doc.imageURL[index]} type="video/webm" />
                              Your browser doesn't support this video tag.
                            </video>
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    // Show single image/video without carousel
                    <div style={{ height: "100%", width: "100%" }}>
                      {doc.imagePath[0].includes("image") ? (
                        <a
                          href={doc.imageURL[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", height: "100%" }}
                        >
                          <Card.Img
                            variant="top"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              backgroundColor: "#f8f9fa" // Optional: adds light background
                            }}
                            src={doc.imageURL[0]}
                          />
                        </a>
                      ) : (
                        <video
                          controls
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            backgroundColor: "#f8f9fa" // Optional: adds light background
                          }}
                        >
                          <source src={doc.imageURL[0]} type="video/mp4" />
                          <source src={doc.imageURL[0]} type="video/ogg" />
                          <source src={doc.imageURL[0]} type="video/webm" />
                          Your browser doesn't support this video tag.
                        </video>
                      )}
                    </div>
                  )}
                </div>
            
              )}

              {/* Like, thumbs up, and share */}
              <div className="d-flex gap-2 mb-3">
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
        ))}
    </>
  );
}
