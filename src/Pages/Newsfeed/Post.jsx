import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../Hook/useDocument";
import {
  Card,
  Carousel,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "react-bootstrap";
import { useFirestore } from "../../Hook/useFirestore";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import Comment from "./Comment";
import "./Post.scss";
import { projectFirebase, firebase, projectAuth } from "../../firebase/config.js";
import { useState } from "react";
import Sharelink from "../../Components/Sharelink";
import TruncateDescription from "../../Components/TruncateDescription.jsx";
import EditForm from "../../Components/EditForm.jsx";

export default function Post() {
  const { id } = useParams();
  const { document, error } = useDocument("MediaPost", id);
  const { updateDocument, deleteDocument } = useFirestore("MediaPost");
  const { formatTimestamp } = useTimestampFormat();
  const [viewComment, setViewComment] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate(); 
  const [shareUrl, setShareUrl] = useState("")
  const [editForm, setEditForm] = useState(false);


  

  if (error) {
    return <div>{error}</div>;
  }
  if (!document) {
    return <div>Loading...</div>;
  }

  //Handle share
  const handleShare = (e, id) => {
    e.preventDefault();
    const tempUrl = `${window.location.origin}/post/${id}`;
    setShareUrl(tempUrl); // Set the specific post URL
    setModalShow(true);
  };


  // Edit and Delete functions
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteDocument(id);
  };

  

  // Handle Like function
  const handleLike = (e, id) => {
    e.preventDefault();
    console.log(id)
    const userId = projectAuth.currentUser.uid;
    const userLikedField = `likes.${userId}`;
    const docRef = projectFirebase.collection("MediaPost").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (!data.likes || !data.likes[userId]) {
            updateDocument(id, {
              [userLikedField]: true,
              likesBy: firebase.firestore.FieldValue.arrayUnion(userId),
              like: firebase.firestore.FieldValue.increment(1),
            });
          } else {
            updateDocument(id, {
              [userLikedField]: firebase.firestore.FieldValue.delete(),
              likesBy: firebase.firestore.FieldValue.arrayRemove(userId),
              like: firebase.firestore.FieldValue.increment(-1),
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error handling like:", error);
      });
  };

  return (
 
    <Container >
      <Row>
        <Col lg={2} md={2}>
          <div className="d-flex f-column justify-content-start">
          <i className="bi bi-arrow-left-circle h1"
          onClick={() => {
            navigate(-1)
          }}></i>
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div key={document.id}>
            {Array.isArray(document.imagePath) &&
              document.imagePath.length > 0 && (
                <div
                  className="media-container"
                  style={{
                    margin: "0 auto",
                    aspectRatio: "4x3",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    boxShadow: "0 1px 3px rgba(1, 1, 0, 1)",
                    maxHeight: "800px",
                    backgroundColor: "#ffffff", // Ensure the background is white
                  }}
                >
                  {document.imagePath.length > 1 ? (
                    // Show carousel for multiple images/videos
                    <Carousel style={{ height: "100%", width: "100%" }}>
                      {document.imagePath.map((path, index) => (
                        <Carousel.Item key={index} style={{ height: "100%" }}>
                          {path.includes("image") ? (
                            <a
                              href={document.imageURL[index]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Card.Img
                                variant="top"
                                style={{
                                  width: "100%",
                                  height: "800px", // Set height to 800px
                                  objectFit: "contain",
                                  backgroundColor: "#000000", // Ensure the background is white
                                }}
                                src={document.imageURL[index]}
                              />
                            </a>
                          ) : (
                            <video
                              controls
                              style={{
                                width: "100%",
                                height: "800px", // Set height to 800px
                                objectFit: "contain",
                                backgroundColor: "#000000", // Ensure the background is black
                              }}
                            >
                              <source
                                src={document.imageURL[index]}
                                type="video/mp4"
                              />
                              <source
                                src={document.imageURL[index]}
                                type="video/ogg"
                              />
                              <source
                                src={document.imageURL[index]}
                                type="video/webm"
                              />
                              Your browser doesn't support this video tag.
                            </video>
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div style={{ height: "100%", width: "100%" }}>
                      {document.imagePath[0].includes("image") ? (
                        <a
                          href={document.imageURL[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", height: "100%" }}
                        >
                          <Card.Img
                            variant="top"
                            style={{
                              width: "100%",
                              height: "800px", // Set height to 800px
                              objectFit: "contain",
                              backgroundColor: "#000000", // Ensure the background is white
                            }}
                            src={document.imageURL[0]}
                          />
                        </a>
                      ) : (
                        <video
                          controls
                          style={{
                            width: "100%",
                            height: "800px", // Set height to 800px
                            objectFit: "contain",
                            backgroundColor: "#000000", // Ensure the background is white
                          }}
                        >
                          <source src={document.imageURL[0]} type="video/mp4" />
                          <source src={document.imageURL[0]} type="video/ogg" />
                          <source
                            src={document.imageURL[0]}
                            type="video/webm"
                          />
                          Your browser doesn't support this video tag.
                        </video>
                      )}
                    </div>
                  )}
                </div>
              )}
          </div>
        </Col>
        <Col lg={4} md={4}>
          <Card
            key={document.id}
            style={{
              boxShadow: "0 1px 3px rgba(1, 1, 0, 1)",
              overflowY: "auto",
              maxHeight: "80vh",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1",
              maxHeight: "600px",
            }}
            className="mb-5 rounded-0"
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <img
                  src={document.photoURL}
                  onClick={(e) => {
                    navigate("/profile");
                  }}
                  alt="User Avatar"
                  className="rounded-circle me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    objectFit: "cover",
                    border: "1px solid black",
                  }}
                />
                <Card.Title className="mb-0 me-2">
                  {document.username}
                </Card.Title>

                <Dropdown className="ms-auto">
                  <DropdownToggle
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "black",
                      padding: "20px",
                    }}
                  >
                    <i className="bi bi-three-dots ms-auto"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                  <Dropdown.Item
                      as={Button}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditForm(true);
                      }}
                    >
                      Edit
                    </Dropdown.Item>

                    <EditForm
                      show={editForm}
                      onHide={() => setEditForm(false)}
                      name="Edit"
                      doc={document}
                    />
                    <Dropdown.Item
                      as={Button}
                      onClick={(e) => handleDelete(e, document.id)}
                      name="edit"
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <p>{formatTimestamp(document.createdAt)}</p>

             

              <Card.Title>{document.title}</Card.Title>
              <Card.Text>
                <TruncateDescription 
                description={document.description}
                wordLimit={20}
              />
              </Card.Text>

               {/* Like, thumbs up, and share */}
               <div className="d-flex gap-2 mb-3">
                {document.likes &&
                document.likes[projectAuth.currentUser.uid] ? (
                  <div className="me-1">
                    <i
                      className="bi bi-heart-fill me-2"
                      as={Button}
                      onClick={(e) => handleLike(e, document.id)}
                    />
                    <span>{document.like} </span>
                  </div>
                ) : (
                  <div className="me-1">
                    <i
                      className="bi bi-heart me-2"
                      as={Button}
                      onClick={(e) => handleLike(e, document.id)}
                    />
                    <span>{document.like}</span>
                  </div>
                )}

                <i className="bi bi-eye me-1" />
                <span>{document.view}</span>

                {/* share */}
                <Sharelink
                  show={modalShow}
                  onHide={() => 
                  {
                    setModalShow(false)
                    setShareUrl("")
                  }
                  }
                  urllink={shareUrl}
                />
                <i className="bi bi-send ms-2" onClick={(e) => handleShare(e, document.id)}></i>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={() => setViewComment((prev) => !prev)}
              >
                {viewComment ? (
                  <p style={{ color: "#800000" }}>Hide comments</p>
                ) : (
                  <p style={{ color: "#800000" }}>
                    View more comments ({document.comment.length})
                  </p>
                )}
              </div>
              {viewComment && <Comment input={document} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
