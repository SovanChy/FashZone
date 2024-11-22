import styles from "./BlogComponent.module.css";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDocument } from "../../Hook/useDocument";
import { useFirestore } from "../../Hook/useFirestore";
import useTimestampFormat from "../../Hook/useTimeStampFormat";
import { useNavigate } from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, Button, Image, Container} from 'react-bootstrap'
import EditBlogNewForm from "./BlogEdit";
import ReactQuill from "react-quill";

export default function BlogPage() {
  const { id } = useParams();
  const { document, error } = useDocument("Blog", id);
  const { deleteDocument, response } = useFirestore("Blog");
  const { formatTimestamp } = useTimestampFormat();
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

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
    <Container className="mt-5">
      <i
        className="bi bi-arrow-left-circle h1"
        onClick={() => {
          navigate("/blog");
        }}
        style={{ cursor: "pointer" }}
      ></i>
      {error && <p>{error}</p>}
      
      {document && !Array.isArray(document) && (
       <Container>
        <Header  document={document} />
       
                    <article className="mt-5">
                        <header>
                          
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
                            <div className="d-flex">
                                <p className="text-muted me-2 mt-2">
                                    {formatTimestamp(document.createdAt)}
                                </p>
                                <i className="bi bi-eye me-2 mt-2" />
                                <span className="mt-2">{document.view}</span>
                            </div>
                        </header>
                        

                        <section className="mt-4">
                        <Button className="custom-button w-24">{document.category.toUpperCase()}</Button>
                            <ReactQuill
                                theme="bubble"
                                value={document.description}
                                readOnly={true}
                                modules={{ toolbar: false }}
                                style={{ width: "100%"}}
                            />
                        </section>
                    </article>
                   
                    </Container>
                )}
              
    </Container>
  );
}
