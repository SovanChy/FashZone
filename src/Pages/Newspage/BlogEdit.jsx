import Button from "react-bootstrap/Button";
import { Form, Spinner, Container, Row, Col, Modal } from "react-bootstrap";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useFirestore } from "../../Hook/useFirestore";
import { useAuthContext } from "../../Hook/useAuthContext";
import { useStorage } from "../../Hook/useStorage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditBlogNewForm({ doc, show, onHide }) {
  const { updateDocument } = useFirestore("Blog");
  const { uploadMedia, urls, paths } = useStorage("Blog");

  const [imageVideo, setImageVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //accessing the id of an object modal
  const id = typeof doc === "object" && doc !== null ? doc.id : doc;


  //returning an doc data for later updates
  useEffect(() => {
    if (doc) {
      setTitle(doc.title || "");
      setDescription(doc.description || "");
      setImageVideo(doc.imageURL || "");
    }
  }, [doc]);

  //words document format for editing
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "color",
    "background",
    "font",
    "size",
  ];

  const handleChange = useCallback((value, delta, source, editor) => {
    setDescription(value);
  }, []);

  const handlePost = (e) => {
    let selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.includes("image")) {
      alert("The selected file must be an image");
      return;
    }

    if (selectedFile.size > 20000000) {
      // 20MB limit
      alert("File size must be less than 20MB");
      return;
    }

    setImageVideo([selectedFile]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (imageVideo.length > 0) {
        await uploadMedia(imageVideo);
      }
      setIsSubmitted(true);
    } catch (err) {
      alert("Error during upload:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (isSubmitted) {
        let updateData = {
          title: title,
          description: description,
        };

        if (urls.length > 0 && paths.length > 0) {
          updateData.imageURL = urls;
          updateData.imagePath = paths;
        }

        updateDocument(id, updateData);
        setImageVideo([]);
        setTitle("");
        setDescription({ ops: [] }); 
        setIsSubmitted(false);
        setIsLoading(false);
        onHide()
      }
    } catch (err) {
      alert("Error adding document:", err.message);
      setIsLoading(false);
    }
  }, [isSubmitted, urls, paths]);

  return (
    <Modal show={show}
    size="xl">
      <Modal.Header>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <div style={{ height: "300px", marginBottom: "50px" }}>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={description}
                  onChange={handleChange}
                  style={{ height: "250px" }}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMedia">
              <Form.Label>Image/Video (optional)</Form.Label>
              <Form.Control type="file" onChange={handlePost} />
            </Form.Group>
            <Button
              variant="danger"
              className="custom-button me-2"
              type="submit"
            >
              Submit
            </Button>

            <Button variant="danger" className="custom-button" onClick={onHide}>
              Close
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
