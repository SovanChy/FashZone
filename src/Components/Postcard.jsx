import React from "react";
import {
  Card,
  Carousel,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "react-bootstrap";
import Comment from "../Pages/Newsfeed/Comment";
import { projectFirebase, firebase, projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sharelink from "./Sharelink.jsx";



//custom hooks
import { useCollection } from "../Hook/useCollection.jsx";
import { useFirestore } from "../Hook/useFirestore";
import useTimestampFormat from "../Hook/useTimeStampFormat";


//css styling
import "./Postcard.css";



export default function Postcard() {
  const { documents, error } = useCollection("MediaPost", ["createdAt", "desc"]);
  const { updateDocument, deleteDocument } = useFirestore("MediaPost");
  const { formatTimestamp } = useTimestampFormat();
  const [viewComment, setViewComment] = useState(false);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false)
  const [url, setUrl] = useState('')
  const location = useLocation()

  useEffect(() => {
  const url = `${window.location.origin}${location.pathname}`
  setUrl(url)
},[location])




  const handleShare = (e, id) => {
    e.preventDefault()
    setModalShow(true)
    const tempUrl = `${url}/${id}`
    setUrl(tempUrl)

  }


  // Read more function
  const truncateDescription = (description, wordLimit, id) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return (
        <>
          {words.slice(0, wordLimit).join(" ")}...
          <span
            style={{ color: "#800000 ", cursor: "pointer" }}
            onClick={() => navigate(`/product/${id}`)}
          >
            Read more
          </span>
        </>
      );
    }
    return description;
  };

  // Edit and Delete function
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteDocument(id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
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
                  src={doc.photoURL}
                  onClick={(e) => {
                    navigate(`/profile`)
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
                    <Dropdown.Item as={Button}>Edit</Dropdown.Item>
                    <Dropdown.Item
                      as={Button}
                      onClick={(e) => handleDelete(e, doc.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <p>{formatTimestamp(doc.createdAt)}</p>

              {Array.isArray(doc.imagePath) && doc.imagePath.length > 0 && (
                <div
                  className="media-container"
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    boxShadow: "0 1px 3px rgba(1, 1, 0, 1)",
                  }}
                >
                  {doc.imagePath.length > 1 ? (
                    <Carousel style={{ height: "100%", width: "100%" }}>
                      {doc.imagePath.map((path, index) => (
                        <Carousel.Item key={index} style={{ height: "100%" }}>
                          {path.includes("image") ? (
                            <a
                              onClick={(e) => 
                                {
                                  navigate(`/product/${doc.id}`)
                                  handleView(e,doc.id)
                                }}
                              target="_blank"
                              rel="noopener noreferrer"

                            >
                              <Card.Img
                                variant="top"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  backgroundColor: "#f8f9fa",
                                }}
                                src={doc.imageURL[index]}
                              />
                            </a>
                          ) : (
                            <video
                              muted
                              controls
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                backgroundColor: "#f8f9fa",
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
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div style={{ height: "100%", width: "100%" }}>
                      {doc.imagePath[0].includes("image") ? (
                        <a
                        onClick={(e) => 
                          {
                            navigate(`/product/${doc.id}`)
                            handleView(e,doc.id)
                          }}
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
                              backgroundColor: "#f8f9fa",
                            }}
                            src={doc.imageURL[0]}
                          />
                        </a>
                      ) : (
                        <video
                          muted
                          controls
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            backgroundColor: "#f8f9fa",
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

          <div className="d-flex gap-2 mb-3">
                {doc.likes &&
                doc.likes[projectAuth.currentUser.uid] ? (
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

                <i
                  className="bi bi-eye me-1"
                />
                 <span>{doc.view}</span>
                 
            
            {/* share */}
            <Sharelink
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  urlLink={{url}}
                />
            
                <i className="bi bi-send ms-auto" onClick={(e) => handleShare(e, doc.id)}></i>
              </div> 

              <Card.Title>{doc.title}</Card.Title>
              <Card.Text>
                {truncateDescription(doc.description, 50, doc.id)}
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
