import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useStorage } from '../../Hook/useStorage';

//css styling 
import styles from './ProfilePage.module.css';

  function IntroSection({ username, occupation, profile }) {


    return (
      <>
        <section className={styles.headerSection}>
          <div className={styles.introColumn}>
            <div className={styles.introBox}>
              <div className={styles.introContent}>
                <h1 className={styles.name}>{username}</h1>
                <p className={styles.title}>{occupation}</p>
              </div>
            </div>
          </div>
          <div className={styles.imageColumn}>
            <img
              loading="lazy"
              src={profile|| `https://placehold.co/840x740?text=No+Picture`}
              className={styles.profileImage}
              alt="Profile"
            
              style={{
                maxHeight: "674px",
                objectFit: "cover"
              }}
              
            />
          </div>
        </section>

      
      </>
    );
  }


export default IntroSection;