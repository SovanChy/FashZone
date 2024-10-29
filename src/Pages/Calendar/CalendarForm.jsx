import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFirestore } from "../../Hook/useFirestore";
import { useAuthContext } from "../../Hook/useAuthContext";
import { useStorage } from "../../Hook/useStorage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCallback } from "react";

function CalendarForm(props) {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore("events");
  const { uid, displayName, photoURL } = user;
  const { uploadMedia, urls, paths, clearMedia } = useStorage("events");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageVideo, setImageVideo] = useState([]);
  const [description, setDescription] = useState({ ops: [] }); // Initialize as Delta
  const [color, setColor] = useState('#800000'); // Default color
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [borderColor, setBorderColor] = useState('#800000')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //word document format for adding post
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
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
    "color",
    "background",
    "font",
    "size",
  ];

  const handleChange = useCallback((value, delta, source, editor) => {
    setDescription(value);
  }, []);

  const handlePost = (e) => {
    const file = e.target.files[0];

    if (!file.type.includes("image")) {
      alert("The selected file must be an image");
      return;
    }

    if (file.size > 20000000) {
      alert("File size must be less than 20MB");
      return;
    }

    setImageVideo([file]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (imageVideo.length) {
      try {
        await uploadMedia(imageVideo);
        setIsSubmitted(true);
      } catch (err) {
        alert("Error during upload:", err.message);
        setIsLoading(false);
      }
    } else {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted && (urls.length > 0 || imageVideo.length === 0)) {
      const doc = {
        uid: uid,
        username: displayName,
        photoURL: photoURL,
        imageURL: urls.length > 0 ? urls : null,
        imagePath: paths.length > 0 ? paths : null,
        title: title,
        description: description,
        date: date,
        color: color,
        textColor: textColor,
        borderColor: borderColor
      };

      addDocument(doc)
        .then(() => {
          console.log("Document added successfully:", doc);
          setTitle("");
          setDescription("");
          setDate("");
          setDescription({ ops: [] }); // Reset to empty Delta
          clearMedia();
          props.onHide();
          setIsSubmitted(false);
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Error adding document:", err.message);
          setIsLoading(false);
        });
    }
  }, [isSubmitted, urls, paths]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name} Post
          </Modal.Title>
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
                <Form.Label>Image (optional)</Form.Label>
                <Form.Control type="file" onChange={handlePost} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="custom-button me-2"
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="danger"
                className="custom-button"
                onClick={props.onHide}
              >
                Close
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CalendarForm;
