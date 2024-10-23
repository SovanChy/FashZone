import React from "react";
import { Card, ListGroup, Carousel } from "react-bootstrap";
import { useCollection } from "../Hook/useCollection";

export default function Postcard() {
  const { documents, error } = useCollection("MediaPost");

  // Helper function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInMs = now - date;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      } else {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes} at ${day} ${month} ${year}`;
      }
    }
    return "No date available";
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
            style={{ width: "600px" }}
            key={doc.id}
            className="mb-5 rounded-0"
          >
            <Card.Body>
              <div className="d-flex  align-items-center mb-2">
                {/* username */}
                <img
                  src={doc.photoURL}
                  alt="User Avatar"
                  className="rounded-circle me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <Card.Title>{doc.username}</Card.Title>
                <i className="bi bi-three-dots ms-auto"></i>
              </div>
              <p>{formatTimestamp(doc.createdAt)}</p>

              {Array.isArray(doc.imagePath) && (
                <Carousel>
                  {doc.imagePath.map((path, index) => (
                    <Carousel.Item key={index}>
                      {path.includes("image") ? (
                        // Render image if path contains 'image'
                        <a
                          href={doc.imageURL[index]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card.Img
                            variant="top"
                            style={{
                              maxHeight: "400px",
                              maxWidth: "600px",
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                            }}
                            src={doc.imageURL[index]}
                            className="mb-3"
                          />
                        </a>
                      ) : (
                        // Render video if it's not an image
                        <video
                          controls
                          style={{
                            maxHeight: "400px",
                            maxWidth: "600px",
                            width: "100%",
                            height: "auto",
                          }}
                          className="mb-3"
                        >
                          <source src={doc.imageURL[index]} type="video/mp4" />
                          <source src={doc.imageURL[index]} type="video/ogg" />
                          <source src={doc.imageURL[index]} type="video/webm" />
                          Your browser doesn't support this video tag.
                        </video>
                      )}
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}

              <div className="d-flex gap-2 mb-3">
                <i className="bi bi-hand-thumbs-up"> {doc.like}</i>
                <i className="bi bi-eye"> {doc.view}</i>
                <i className="bi bi-share ms-auto"></i>
              </div>
              <Card.Title>{doc.title}</Card.Title>
              <Card.Text>{doc.description}</Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <span>Comment</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
