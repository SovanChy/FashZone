import React from "react";
import {
  Card,
  Carousel,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "react-bootstrap";
import Comment from "./Comment.jsx";
import { projectFirebase, firebase, projectAuth } from "../../firebase/config.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sharelink from "../../Components/Sharelink.jsx";
import TruncateDescription from "../../Components/TruncateDescription.jsx";
import EditForm from "./EditForm.jsx";

//custom hooks
import { useCollection } from "../../Hook/useCollection.jsx";
import { useFirestore } from "../../Hook/useFirestore.jsx";
import useTimestampFormat from "../../Hook/useTimeStampFormat.jsx";
import { useAuthContext } from "../../Hook/useAuthContext.jsx";


//css styling
import "./Postcard.css";

export default function Postcard() {
  const  {user } = useAuthContext()
  const { documents, error } = useCollection("MediaPost", [
    "createdAt",
    "desc",
  ],
  );
  const { updateDocument, deleteDocument, response } =
    useFirestore("MediaPost");
  const { formatTimestamp } = useTimestampFormat();
  const [viewComment, setViewComment] = useState(false);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Edit and Delete function
  const handleShare = (e, id) => {
    e.preventDefault();
    const tempUrl = `${window.location.origin}/post/${id}`;
    setShareUrl(tempUrl); // Set the specific post URL
    setModalShow(true);
  };

  // Edit and Delete function
  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      deleteDocument(id);
    } catch {
      alert(response.error);
    }
  };

  // Handle like function
  // Handle Like function
  const handleLike = (e, id) => {
    e.preventDefault();
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

  // Handle view function
  const handleView = (e, id) => {
    e.preventDefault();
    const userId = projectAuth.currentUser.uid;
    const userViewedField = `views.${userId}`;
    const docRef = projectFirebase.collection("MediaPost").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (!data.views || !data.views[userId]) {
            updateDocument(id, {
              [userViewedField]: true,
              viewsBy: firebase.firestore.FieldValue.arrayUnion(userId),
              view: firebase.firestore.FieldValue.increment(1),
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error handling view:", error);
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
            style={{
              maxWidth: "600px",
              boxShadow: "0 1px 3px rgba(1, 1, 0, 1)",
            }}
            key={doc.id}
            className="mb-5 rounded-0"
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <img
                  src={doc.photoURL || `https://placehold.co/40x40`}
                  onClick={(e) => {
                    navigate(`/profile/${doc.uid}`)
                   
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
                <Card.Title className=" me-2">{doc.username}</Card.Title>

                <Dropdown className="ms-auto">
                  <DropdownToggle
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "black",
                      padding: "20px",
                    }}
                  >
                    <i className="bi bi-three-dots ms-auto"> </i>
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
                      doc={doc}
                    />

                    <Dropdown.Item
                      as={Button}
                      onClick={(e) => handleDelete(e, doc.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <p className="mt-2">{formatTimestamp(doc.createdAt)}</p>
              {Array.isArray(doc.imagePath) && doc.imagePath.length > 0 && (
                <div
                  className="media-container"
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    boxShadow: "0 1px 3px rgba(1, 1, 0, 1)",
                    backgroundColor: "#000000"
                    
                  }}
                >
                  {doc.imagePath.length > 1 ? (
                    <Carousel style={{ height: "100%", width: "100%"}}>
                      {doc.imagePath.map((path, index) => (
                        <Carousel.Item key={index} style={{ height: "100%" }}>
                          {path.includes("image") ? (
                       
                              <div
                                onClick={(e) => {
                                  navigate(`/post/${doc.id}`);
                                  handleView(e, doc.id);
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <Card.Img
                                  variant="top"
                                  style={{
                                  width: "100%",
                                  height: "400px",
                                  objectFit: "cover",
                                  backgroundColor: "#000000",
                                  }}
                                  src={doc.imageURL[index]}
                                />
                                </div>
                        
                              ) : (
                              <>
                                <a
                                onClick={(e) => {
                                  navigate(`/post/${doc.id}`);
                                  handleView(e, doc.id);
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                               
                                <video
                                  muted
                                  controls
                                  style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover",
                                    backgroundColor: "#000000",
                                  }}
                                >
                                  <source
                                    src={doc.imageURL[index]}
                                    type="video/mp4"
                                  />
                                  <source
                                    src={doc.imageURL[index]}
                                    type="video/ogg"
                                  />
                                  <source
                                    src={doc.imageURL[index]}
                                    type="video/webm"
                                  />
                                  Your browser doesn't support this video tag.
                                </video>
                              </a>
                            </>
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div style={{ height: "100%", width: "100%"}}>
                      {doc.imagePath[0].includes("image") ? (
                        <a
                          onClick={(e) => {
                            navigate(`/post/${doc.id}`);
                            handleView(e, doc.id);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card.Img
                            variant="top"
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              backgroundColor: "#000000",
                            }}
                            src={doc.imageURL[0]}
                          />
                        </a>
                      ) : (
                        <a
                          onClick={(e) => {
                            navigate(`/post/${doc.id}`);
                            handleView(e, doc.id);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <video
                            muted
                            controls
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              backgroundColor: "#000000",
                            }}
                          >
                            <source src={doc.imageURL[0]} type="video/mp4" />
                            <source src={doc.imageURL[0]} type="video/ogg" />
                            <source src={doc.imageURL[0]} type="video/webm" />
                            Your browser doesn't support this video tag.
                          </video>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="d-flex gap-2 mb-3 align-items-center">
                {doc.likes && doc.likes[projectAuth.currentUser.uid] ? (
                  <div className="me-1">
                    <i
                      className="bi bi-heart-fill me-2"
                      as={Button}
                      onClick={(e) => handleLike(e, doc.id)}
                    />
                    <span>{doc.like} </span>
                  </div>
                ) : (
                  <div className="me-1">
                    <i
                      className="bi bi-heart me-2"
                      as={Button}
                      onClick={(e) => handleLike(e, doc.id)}
                    />
                    <span>{doc.like}</span>
                  </div>
                )}

                <i className="bi bi-eye me-1" />
                <span>{doc.view}</span>

                <i
                  className="bi bi-send ms-2"
                  onClick={(e) => handleShare(e, doc.id)}
                ></i>

            

                <Button
                  className="custom-button ms-auto"
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    navigate(`/post/${doc.id}`);
                    handleView(e, doc.id)
                  }}
                >
                  Go to Post
                </Button>

                <Sharelink
                  show={modalShow}
                  onHide={() => {
                    setModalShow(false);
                    setShareUrl("");
                  }}
                  urllink={shareUrl}
                />

               
               
              </div>

              <Card.Title>{doc.title}</Card.Title>
              <Card.Text>
                <TruncateDescription
                  description={doc.description}
                  wordLimit={20}
                />
              </Card.Text>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setViewComment((prev) => !prev)}
              >
                {viewComment ? (
                  <p style={{ color: "#800000" }}>Hide comments</p>
                ) : (
                  <p style={{ color: "#800000" }}>
                    View more comments ({doc.comment.length})
                  </p>
                )}
              </div>
              {viewComment && <Comment key={doc.id} input={doc} />}
            
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
