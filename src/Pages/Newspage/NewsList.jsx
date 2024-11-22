import { useCollection } from "../../Hook/useCollection";
import { projectAuth, projectFirebase, firebase } from "../../firebase/config";
import React, { useState, useEffect } from "react";
import {
  Container,
  Image,
  ListGroup,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../Hook/useFirestore";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NewsList.css";
import EditNewForm from "./NewsEdit";

export default function NewsList() {
  // Custom hook for collection
  const { documents, error } = useCollection("Article", ["createdAt", "desc"]);
  const navigate = useNavigate();
  const { updateDocument, deleteDocument, response } = useFirestore("Article");
  const { formatTimestamp } = useTimestampFormat();

  // Group all useState hooks together at the top
  const [isLoading, setIsLoading] = useState(true);
  const [displayError, setDisplayError] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //handle current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //handleView
  // Handle view function
  const handleView = (e, id) => {
    e.preventDefault();
    const userId = projectAuth.currentUser.uid;
    const userViewedField = `views.${userId}`;
    const docRef = projectFirebase.collection("Article").doc(id);

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

  //delete feature
  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      deleteDocument(id);
    } catch {
      alert(response.error);
    }
  };

  // Handle loading and error states with useEffect
  useEffect(() => {
    if (error) {
      setDisplayError(error);
      setIsLoading(false);
    }
    if (documents !== null) {
      setIsLoading(false);
    }
  }, [documents, error]);

  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/newsform");
  };

  if (isLoading) {
    return (
      <Container
        className="m-5 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (displayError) {
    return (
      <Container className="m-5">
        <div>Error: {displayError}</div>
      </Container>
    );
  }

  //Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <i
          className="bi bi-arrow-left-circle h1"
          onClick={() => {
            navigate("/news");
          }}
        ></i>
        <h1>ARTICLES</h1>

        <Button className="custom-button" onClick={handleCreate}>
          Create
        </Button>
      </div>

      <ListGroup className="listGroup">
        {currentDocuments && currentDocuments.length > 0 ? (
          currentDocuments.map((article) => (
            <ListGroup.Item key={article.id} className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <h2
                  onClick={(e) => {
                    handleView(e, article.id);
                    navigate(`/article/${article.id}`);
                  }}
                  className="title mb-0"
                >
                  {article.title}
                </h2>
                <Dropdown className="ms-auto p-0 ">
                  <DropdownToggle
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "black",
                    }}
                  >
                    <i className="bi bi-three-dots"> </i>
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

                    <EditNewForm
                      show={editForm}
                      onHide={(e) => {
                        setEditForm(false);
                      }}
                      doc={article}
                      name="Edit"
                    />

                    <Dropdown.Item
                      as={Button}
                      onClick={(e) => handleDelete(e, article.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="d-flex  align-items-start ">
                <small>{formatTimestamp(article.createdAt)}</small>
                <i className="bi bi-eye ms-auto" />
                <span className="ms-2">{article.view}</span>
              </div>
              <div
                className="d-flex mt-2"
                style={{
                  height: "200px",
                }}
              >
                <Image
                  src={article.imageURL}
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                    objectPosition: "center",
                    flexShrink: 0, // Prevents the image from resizing
                  }}
                />

                <ReactQuill
                  theme="bubble"
                  value={article.description}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  className="!border-none no-scroll"
                />
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>
            <p>No articles found.</p>
          </ListGroup.Item>
        )}
      </ListGroup>
      <Pagination className="custom-pagination mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}
