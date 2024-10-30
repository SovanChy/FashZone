import React from 'react';
import { useState } from 'react';
import styles from './ProfilePage.module.css';
import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectSection';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../Hook/useDocument';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { projectFirebase } from '../../firebase/config';
import ProfileEditForm from './ProfileEditForm';
import PortfolioEditForm from './PortfolioEditForm';


function ProfilePage() {
  const [form, setForm] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState(false);
  const { id } = useParams();
  const { document, error } = useDocument("users", id);

  return (
    <main className={styles.profileContainer}>
      <div className='d-flex'>
      <Button className='custom-button mb-3 me-3 ms-auto'
        onClick={() => {
          setForm(true)
        }}>
        Edit Profile
      </Button>
      <Button className='custom-button mb-3 me-3'
        onClick={() => {
          setPortfolioForm(true)
        }}>
        Edit Portfolio
      </Button>
      </div>
      {document && (
        <>
          {form ? (
            <ProfileEditForm profile={document} setForm={setForm} />
          ) : portfolioForm ? (
            <PortfolioEditForm 
            portfolio={document}
            show={portfolioForm} 
            idPort={document.id}
            onHide={(e) => setPortfolioForm(false)} />
          ) : (
            <>
              <IntroSection
                username={document.displayName}
                occupation={document.occupations}
                profile={document.imageURL}
              />
              <AboutSection description={document.description} />
              <ProjectsSection portfolio={document} />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default ProfilePage;