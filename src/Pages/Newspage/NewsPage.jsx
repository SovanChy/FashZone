import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditBlogNewForm from "./NewsEdit";
import { useParams } from "react-router-dom";
import { useDocument } from "../../Hook/useDocument";
import { useFirestore } from "../../Hook/useFirestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import useTimestampFormat from "../../Hook/useTimeStampFormat";


export default function NewsPage() {
  const { id } = useParams();
  const { document, error } = useDocument("Article", id);
  const { deleteDocument, response } = useFirestore("Article");
  const { formatTimestamp } = useTimestampFormat();
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  console.log(document);

  //handleDelete
  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      deleteDocument(id);
    } catch {
      alert(response.error);
    }
  };

return (
    <Container  className="mt-5" >
        <Row className="justify-content-md-center">
            <Col md={10} lg={10}>
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
                                {document.title.toUpperCase()}
                            </h1>
                            <div className="d-flex align-items-center">
                                <p className="text-muted mb-0 me-2">
                                    By {document.displayName}
                                </p>
                                <img
                                    src={document.photoURL}
                                    onClick={(e) => {
                                        navigate(`/profile/${document.uid}`);
                                    }}
                                    alt="User Avatar"
                                    className="rounded-circle me-3"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className="d-flex">
                                <p className="text-muted me-2">
                                    {formatTimestamp(document.createdAt)}
                                </p>
                                <i className="bi bi-eye me-2" />
                                <span>{document.view}</span>
                                <div className="ms-auto">
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

                                            <EditBlogNewForm
                                                show={editForm}
                                                onHide={(e) => {
                                                    setEditForm(false);
                                                }}
                                                doc={document}
                                                name="Edit"
                                            />

                                            <Dropdown.Item
                                                as={Button}
                                                onClick={(e) => handleDelete(e, document.id)}
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </header>
                        <Image
                            src={document.imageURL}
                            fluid
                            style={{ width: "100%", height: "600px", objectFit: "cover", objectPosition: "center"}}
                        />

                        <section className="mt-4">
                        <Button className="custom-button w-24">{document.category.toUpperCase()}</Button>
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
