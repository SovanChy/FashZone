import React from "react";
import styles from "./ProfilePage.module.css";
import { projectFirebase } from "../../firebase/config";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function ProjectsSection({ portfolioProps = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  //deleting comment
  const handleShowModal = (project) => {
    setSelectedProject(project);  // Set the entire project object
    setShowModal(true);
    console.log("Selected project:", project);  // Debug: Check the selected project
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedProject) return; // Ensure there's a selected project
    const docRef = projectFirebase.collection("users").doc(portfolioProps.id);
    const doc = await docRef.get();
    const data = doc.data();
    const portfolios = data.portfolio ? [...data.portfolio] : [];
  
    const portfoliosIndex = portfolios.findIndex(
      (portfolio) => portfolio.id === selectedProject.id
    );
    if (portfoliosIndex === -1) {
      console.error("Project not found");
      return;
    }
  
    portfolios.splice(portfoliosIndex, 1); // Remove the project from the array
    await docRef.update({ portfolio: portfolios }); // Update the document in Firestore
    setShowModal(false);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <>
      <h2 className={styles.projectsTitle}>My Projects</h2>

      <div className="d-flex flex-wrap">
        {portfolioProps.portfolio &&
          portfolioProps.portfolio.length > 0 &&
          portfolioProps.portfolio.map((portfolioProject) => (
            <section
              key={portfolioProject.id}
              className={styles.projectsSection}
            >
              <div className={styles.projectsGrid}>
                <div className={styles.projectsRow}>
                  <div className={styles.projectColumn}>
                    <div className={styles.projectCard}>
                      <img
                        src={portfolioProject.portfolioURL}
                        className={styles.projectImageOutside}
                        alt="image"
                        onClick={() =>
                          handleShowModal(portfolioProject)
                        }
                      />

                      <Modal
                        size="xl"
                        dialogClassName="custom-modal-height"
                        show={showModal}
                        onHide={handleCloseModal}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Project Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {selectedProject && (
                            <div>
                              <a
                                href={selectedProject.portfolioURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={selectedProject.portfolioURL}
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
                            onClick={handleDelete
                            }
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary"
                            className="custom-button"
                            onClick={handleCloseModal}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}

export default ProjectsSection;
