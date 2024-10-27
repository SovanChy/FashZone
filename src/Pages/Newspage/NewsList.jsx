import { useCollection } from "../../Hook/useCollection";
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
} from "react-bootstrap";
import { truncateDescription } from "../../Components/TruncateDescription";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../Hook/useFirestore";
import EditForm from "./NewsBlogEditForm";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import Pagination from 'react-bootstrap/Pagination';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NewsList.css"

export default function NewsList() {
  // Custom hook for collection
  const { documents, error } = useCollection("Article", ["createdAt", "desc"]);
  const navigate = useNavigate();
  const { deleteDocument, response } = useFirestore("Article");
  const { formatTimestamp } = useTimestampFormat();

  
  // Group all useState hooks together at the top
  const [isLoading, setIsLoading] = useState(true);
  const [displayError, setDisplayError] = useState(null);
  const [editForm, setEditForm] = useState(false);

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

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <i
          className="bi bi-arrow-left-circle h1"
          onClick={() => {
            navigate("/news");
          }}
        ></i>
        <Button className="custom-button" onClick={handleCreate}>
          Create Article
        </Button>
      </div>

      <ListGroup>
        {documents && documents.length > 0 ? (
          documents.map((article) => (
            <ListGroup.Item key={article.id} className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <h5
                  onClick={() => navigate(`/article/${article.id}`)}
                  className="title"
                >
                  {article.title}
                </h5>
                <Dropdown>
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

                    <EditForm
                      show={editForm}
                      onHide={() => setEditForm(false)}
                      name="Edit"
                      doc={article}
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
              <div className="d-flex justify-content-between align-items-center">
                <small>{formatTimestamp(article.createdAt)}</small>
              </div>
              <div className="d-flex">
                <Image
                  src={article.imageURL}
                  fluid
                  className="w-40"
                  style={{ width: "250px", height: "200px", objectFit: "fit" }}
                />
                <ReactQuill
                  theme="bubble"
                  value={truncateDescription(article.description, 30)}
                  readOnly={true}
                  modules={{ toolbar: false }}
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
    </Container>
  );
}
