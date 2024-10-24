import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Sharelink({  urlLink,  onHide, ...modalProps }) {
   
    const urlString = typeof urlLink === 'object' && urlLink !== null ? urlLink.url : urlLink;
 

    const copyToClipboard = () => {
        navigator.clipboard.writeText(urlString).then(() => {
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div>
            <Modal
                {...modalProps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
               
                <Modal.Body>
                    <div className="d-flex align-items-center">
                        <h2 style={{
                            fontWeight: "bold"
                        }}className="mb-0 me-3">Share Link: </h2>
                        <p className="mb-0">{urlString}</p>
                        <Button className="custom-button ms-auto" onClick={copyToClipboard}>Copy Link</Button>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-button" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

