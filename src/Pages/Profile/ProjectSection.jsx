import React from "react";
import styles from "./ProfilePage.module.css";
import { projectFirebase } from "../../firebase/config";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function ProjectsSection({ portfolio = [] }) {
  //deleting comment
  const handleDelete = async (e, portfolioID, currentPortfolioID) => {
    e.preventDefault();
    const docRef = projectFirebase.collection("users").doc(portfolioID);
    const doc = await docRef.get();
    const data = doc.data();
    console.log(data);
    const portfolios = data.portfolioURL ? [...data.portfolioURL] : [];

    const portfoliosIndex = portfolios.findIndex(
      (portfolio) => portfolio.id === currentPortfolioID
    );

    if (portfoliosIndex === -1) {
      console.error("Comment not found");
      return;
    }
    portfolios.splice(portfoliosIndex, 1); // Remove the comment from the array
    await docRef.update({ portfolioURL: portfolios }); // Update the document in Firestore
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <>
      <h2 className={styles.projectsTitle}>My Projects</h2>

    <div className="d-flex flex-wrap">
      {portfolio.portfolioURL.length &&
        portfolio.portfolioURL.map((portfolioProject) => (
          <section className={styles.projectsSection}>
            <div className={styles.projectsGrid}>
              <div className={styles.projectsRow}>
                <div className={styles.projectColumn}>
                  <div className={styles.projectCard}>
                    <img
                      loading="lazy"
                      src={portfolioProject.portfolioURL}
                      className={styles.projectImage}
                      alt="image"
                      onClick={() =>
                        handleShowModal(portfolioProject.portfolioURL)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <Modal size="xl" dialogClassName="custom-modal-height" show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedProject && (
                  <div>
                    <a href={selectedProject} target="_blank" rel="noopener noreferrer">
                    <img
                      src={selectedProject}
                      className={styles.projectImage}
                      alt="image"
                    />
                    </a>
                   
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
              <Button
                      className="custom-button"
                      onClick={(e) =>
                        handleDelete(e, portfolio.id, portfolioProject.id)
                      }
                    >
                      Delete
                    </Button>
                <Button variant="secondary" className="custom-button" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        ))}
        </div>
    </>
  );
}

export default ProjectsSection;
