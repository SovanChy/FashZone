import React from "react";
import { Card, ListGroup, Carousel, Dropdown, DropdownMenu, DropdownToggle, Button} from "react-bootstrap";
import { useCollection } from "../Hook/useCollection";
import { useFirestore } from "../Hook/useFirestore";
import useTimestampFormat from "../Hook/useTimeStampFormat";
import Comment from "../Pages/Newsfeed/Comment";
import './Postcard.css'
import { projectFirebase, firebase, projectAuth } from "../firebase/config";
import { useState } from "react";

export default function Postcard() {
  const { documents, error } = useCollection("MediaPost");
  const { updateDocument, deleteDocument} = useFirestore("MediaPost")
  const {formatTimestamp} = useTimestampFormat()
  const [viewComment, setViewComment] = useState(false);



  //Edit and Delete function
  const handleDelete = (e, id) => {
    e.preventDefault()
    deleteDocument(id)
   
  }

  const handleEdit = (e) => {
    e.preventDefault()

  }

  //handle like, view, and share function

  //handle like function
  const handleLike = (e, id) => {
    e.preventDefault();
    const userId = projectAuth.currentUser.uid;
    const userLikedField = `likes.${userId}`;
    const docRef = projectFirebase.collection("MediaPost").doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        //update like and liked by in case where the post doesn't have one
        if (!data.likes || !data.likes[userId]) {
          updateDocument(id, {
            [userLikedField]: true,
            like: firebase.firestore.FieldValue.increment(1),
          });
        } else {
          
            // Unlike the post
            updateDocument(id, {
              [userLikedField]: firebase.firestore.FieldValue.delete(),
              like: firebase.firestore.FieldValue.increment(-1),
            });
          }        
      }
    },


  ).catch((error) => {
      console.error("Error checking like status: ", error);
    });
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
            style={{ maxWidth: "800px", 

              boxShadow: "0 1px 3px rgba(1, 1, 0, 1)" // Added to maintain spacing
            }}
            key={doc.id}
            className="mb-5 rounded-0"
          >
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                        <img
                          src={doc.photoURL}
                          alt="User Avatar"
                          className="rounded-circle me-3"
                          style={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          objectFit: "cover",
                          border: "1px solid black" // Set border color
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
                          marginBottom: "1rem",
                          boxShadow: "0 1px 3px rgba(1, 1, 0, 1)" // Added to maintain spacing
                }}>
             
                  {doc.imagePath.length > 1 ? (
                    // Show carousel for multiple images/videos
                    <Carousel  style={{ height: "100%", width: "100%" }} >
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

            {doc.likes && doc.likes[projectAuth.currentUser.uid] ? (
              <i className="bi bi-hand-thumbs-up-fill"            
                as={Button} 
                onClick={(e) => handleLike(e, doc.id)}
              >
                {doc.like}
              </i>
            ) : (
              <i className="bi bi-hand-thumbs-up"
                as={Button} 
                onClick={(e) => handleLike(e, doc.id)}
              > 
                {doc.like}
              </i>
            )}

                <i className="bi bi-eye"> {doc.view}</i>
                <i className="bi bi-share ms-auto"></i>
              </div>
              <Card.Title>{doc.title}</Card.Title>
              <Card.Text>{doc.description}</Card.Text>

              <p style={{cursor: "pointer"}} 
              onClick={() => setViewComment((prev) => !prev)}>
                {viewComment ? "Hide comments" : "View more comments"}
              </p>
              {viewComment && <Comment input={doc}/> }
         
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
