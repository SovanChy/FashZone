import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import "./Job.css";
import { useDocument } from "../../Hook/useDocument";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../../Hook/useFirestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobEditForm from "./JobEditForm";
import { useState } from "react";


export default function View() {
  const { id } = useParams();
  const { document } = useDocument("Job", id);
  const navigate = useNavigate();
  const { deleteDocument, response } = useFirestore("Job");
  const [editForm, setEditForm] = useState(false);

  // Handle Delete
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await deleteDocument(id);
      if (response.error) {
        alert("Error deleting document: " + response.error);
      } else {
        alert("Document deleted successfully.");
        navigate("/job"); // Redirect after deletion
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Container className="mt-5">
      {document && (
        <>
          <div className="d-flex align-items-center">
            <i
              className="bi bi-arrow-left-circle h1"
              onClick={() => navigate("/job")}
              style={{ cursor: "pointer" }}
            ></i>
            <div className="ms-auto">
              <Button className="custom-button"
              onClick={(e) => setEditForm(true) }>Edit</Button>

              <JobEditForm
                show={editForm}
                onHide={(e) => {
                  setEditForm(false);
                }}
                doc={document}
                name="Edit"
              />
              <Button
                className="custom-button"
                onClick={(e) => handleDelete(e, document.id)}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Banner Image */}
          <Row>
            <Col>
              <Image
                src={document.imageURL}
                alt="Banner"
                fluid
                className="w-100"
                style={{ height: "500px", objectFit: "cover" }}
              />
            </Col>
          </Row>

          {/* Job Details */}
          <Row className="mt-4">
            <Col>
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <div>
                    <strong>Title: </strong>
                    {document.title}
                    <br />
                    <strong>Company: </strong>
                    {document.company}
                    <br />
                    <strong>Salary: </strong>
                    {document.salary}
                    <br />
                    <strong>Location: </strong>
                    {document.location}
                    <br />
                    <strong>Deadline:</strong>{" "}
                    {document.deadline
                      ? `${new Date(document.deadline).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}`
                      : "No date"}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Who We're Looking For */}
          <Row className="mt-5">
            <Col>
              <h3 className="who-looking-for">
                Who We're Looking For
              </h3>
              <ReactQuill
                theme="bubble"
                value={document.description}
                readOnly={true}
                modules={{ toolbar: false }}
                style={{ width: "100%"}}
                className="!border-none no-scroll"               

              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
