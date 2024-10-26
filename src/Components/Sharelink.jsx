import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShareLink(props) {
  // Initialize urlString only when component mounts or urlLink changes
  const [urlString, setUrlString] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy Link");

  // Update urlString whenever urlLink prop changes
  useEffect(() => {
  try {
    const newUrl = props.urllink;
    setUrlString(newUrl);
  } catch (err) {
    console.error('Error setting URL:', err);
  }
  }, [props.urllink]);

  // Reset copy status when modal closes
  useEffect(() => {
    if (!props.show) {
      setCopyStatus("Copy Link");
    }
  }, [props.show]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlString)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy Link"), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopyStatus("Failed to copy");
      });
  };

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExited={() => setUrlString("")}
    >
      <Modal.Body>
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-xl m-0">Share Link:</h2>
          <p className="m-0 flex-grow truncate">{urlString}</p>
          <Button 
            onClick={copyToClipboard}
            className="custom-button ml-auto whitespace-nowrap"
          >
            {copyStatus}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-button" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}