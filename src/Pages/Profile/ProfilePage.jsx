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
import ProfileEditForm from './ProfileEditForm';

function ProfilePage() {
  const [form, setForm] = useState(false)
  const navigate = useNavigate() 
  const {id} = useParams()
  const {document, error} = useDocument("users", id); 
  console.log(document)
 


  return (
    <main className={styles.profileContainer}>
      <Button className='custom-button mb-3 me-3 ms-auto'
       onClick={() => {
        setForm(true)}}>
    Edit Profile</Button>
      {document && (
        <>
        {form ? (
            <ProfileEditForm profile={document} setForm={setForm} />
           
           
          ) : (
            <>
              <IntroSection 
                username={document.displayName}
                occupation={document.occupations}
                profile={document.imageURL} 
              />
              <AboutSection description={document.description} />
              <ProjectsSection />
            </>
          )}
      </> 
      )}
    </main>
  );
}

export default ProfilePage;