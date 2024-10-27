import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../Hook/useDocument";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import useTimestampFormat from "../../Hook/useTimeStampFormat";

export default function NewsPage() {
  const { id } = useParams();
  const { document, error } = useDocument("Article", id);
  const { formatTimestamp } = useTimestampFormat();
  const navigate = useNavigate();
  console.log(document);

  return (
    <Container fluid className="mt-5" style={{ height: "2000px" }}>
      <Row className="justify-content-md-center">
        <Col md={11} lg={11}>
          <i
            className="bi bi-arrow-left-circle h1"
            onClick={() => {
              navigate("/article");
            }}
            style={{ cursor: "pointer" }}
          ></i>
          {error && <p>{error}</p>}
          {document && !Array.isArray(document) && (
            <article className="mt-4">
              <header>
                <h1 className="display-4" style={{ fontWeight: "bold" }}>
                  {document.title}
                </h1>
                <div className="d-flex align-items-center">
                <p className="text-muted mb-0 me-2">By {document.displayName}</p>
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
                      objectFit: "contain",
                      border: "1px solid black",
                    }}
                  />
                 
                </div>

                <p className="text-muted">
                  {formatTimestamp(document.createdAt)}
                </p>
              </header>
              <Image
                src={document.imageURL}
                fluid
   
                style={{ width: "100%", height: "600px", objectFit: "cover" }}
              />
              <section className="mt-4">
                <ReactQuill
                  theme="bubble"
                  value={document.description}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  style={{ width: "100%", height: "400px" }}
                />
              </section>
            </article>
          )}
        </Col>
      </Row>
    </Container>
  );
}
