import { Form, Spinner, Card, Modal, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFirestore } from "../../Hook/useFirestore";
import { useAuthContext } from "../../Hook/useAuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCallback } from "react";
import { useStorage } from "../../Hook/useStorage";

function CalendarEditForm({ show, onHide, name, selectedEvents }) {
  const { user } = useAuthContext();
  const { updateDocument, deleteDocument } = useFirestore("events");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const { uploadMedia, urls, paths } = useStorage("Events");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageVideo, setImageVideo] = useState([]);
  const [description, setDescription] = useState({ ops: [] }); // Initialize as Delta

  // Access the id of the selected event
  const id =
    typeof selectedEvents === "object" && selectedEvents !== null
      ? selectedEvents.id
      : selectedEvents;

  //retain old data
  useEffect(() => {
    if (selectedEvents) {
      setTitle(selectedEvents.title || "");
      setDescription(selectedEvents.description || "");
      setImageVideo(selectedEvents.imageURL || "");
      setDate(selectedEvents.date || "");
    }
  }, [selectedEvents]);

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

  // Delete function
  const handleDelete = (e) => {
    e.preventDefault();
    if (id) {
      setIsLoading(true);
      try {
        deleteDocument(id);
        onHide();
      } catch (error) {
        console.error("Error deleting document:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  //handle image upload
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

  // Handle form submission
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
    if (isSubmitted) {
      try {
        let updateData = {
          title: title,
          description: description,
          date: date,
        };
        if (urls.length > 0 && paths.length > 0) {
          updateData.imageURL = urls;
          updateData.imagePath = paths;
        }
        updateDocument(id, updateData);
        onHide();
        setTitle("");
        setDescription("");
        setDate("");
        setImageVideo([]);
        setDescription({ ops: [] });
        // Close the modal after updating

        // Reset to empty Delta
      } catch (err) {
        alert("Error adding document:", err.message);
        setIsLoading(false);
      }
    }
  }, [isSubmitted, urls, paths]);

  return (
    <>
      {edit ? (
        <Modal
          show={show}
          onHide={() => {
            onHide();
            setEdit(true);
          }}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Event</Modal.Title>
            <Button
              variant="danger"
              className="custom-button ms-auto"
              onClick={handleEditForm}
            >
              Go to Edit
            </Button>

            {id && (
              <Button
                variant="danger"
                className="custom-button "
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Card>
                <Card.Header>
                  <div>
                    Created by: {selectedEvents.username}
                    <img
                      src={selectedEvents.photoURL}
                      alt="User Avatar"
                      className="rounded-circle ms-3"
                      style={{
                        objectFit: "cover",
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Card.Header>
                <Card.Body>
                 
                  <Card.Img
                    src={selectedEvents.imageURL}
                    fluid
                    style={{
                      width: "100%",
                      height: "600px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                   <Card.Title className="mt-4">{title}</Card.Title>
                  <Card.Text>
                    <ReactQuill
                      theme="bubble"
                      value={description}
                      readOnly={true}
                      modules={{ toolbar: false }}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Card.Text>
                  <Card.Text style={{
                    fontWeight: "bold"
                  }}>
                    Event Date: {date
                      ? `${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ${new Date(
                          date
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : "No Date Selected"}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="custom-button"
              onClick={() => {
                onHide();
                setEdit(true);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={() => {
            onHide();
            setEdit(true);
          }}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {name} Post
            </Modal.Title>
            <Button
              variant="danger"
              className="custom-button ms-auto"
              onClick={handleEditForm}
            >
              Go to View
            </Button>

            {id && (
              <Button
                variant="danger"
                className="custom-button "
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
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
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date and Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="custom-button me-2"
                >
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  className="custom-button"
                  onClick={() => {
                    onHide();
                    setEdit(true);
                  }}
                >
                  Close
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default CalendarEditForm;
