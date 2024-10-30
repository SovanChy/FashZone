import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useStorage } from '../../Hook/useStorage';
import { useFirestore } from '../../Hook/useFirestore';
import { projectAuth, projectFirebase, firebase } from '../../firebase/config';
import { useAuthContext } from '../../Hook/useAuthContext';

const Setting = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { uploadMedia, urls, paths } = useStorage("users");
    const { updateDocument } = useFirestore("users");
    const { dispatch } = useAuthContext();


    const handleProfile = (e) => {
        let selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.includes("image")) {
            alert("The selected file must be an image");
            return;
        }

        if (selectedFile.size > 20000000) {
            alert("File size must be less than 20MB");
            return;
        }

        setProfile(selectedFile);
    };



    const handleUserChanges = async () => {
        try {
            const user = projectAuth.currentUser;

            if (!user) {
                throw new Error('No user is currently signed in');
            }

            await user.updateProfile({
                displayName: displayName,
                photoURL: urls[0] // Assuming the first URL is the profile picture
            });

            await projectFirebase
                .collection("users")
                .doc(user.uid)
                .update({
                    displayName: displayName,
                    photoURL: urls[0],
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            dispatch({ type: 'LOGIN', payload: user })
            console.log(user)
            console.log("Profile updated successfully");
            alert("Profile updated successfully");
            setIsUpdated(true);
            return true;

        } catch (error) {
            console.error("Error updating profile:", error.message);
            alert("Error updating profile: " + error.message);
            setIsUpdated(false);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (profile) {
                await uploadMedia([profile]);
            }
            setIsSubmitted(true);
        } catch (err) {
            alert("Error during upload: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const updateUserProfile = async () => {
            if (isSubmitted && urls.length > 0) {
                try {
                    await handleUserChanges();
                    alert("Profile has successfully been updated");
                } catch (error) {
                    alert("There was an error with the process. Please try again");
                }
                setDisplayName("");
                setProfile(null);
                setIsSubmitted(false);
                setIsLoading(false);
            }
        };

        updateUserProfile();
    }, [isSubmitted, urls, paths]);

    return (
        <Container className='mt-10'>
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mt-2' controlId="formDisplayName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder='Username...'
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleProfile}
                    />
                </Form.Group>
                <Button variant="primary" className='custom-button mt-2' type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </Form>
        </Container>
    );
};

export default Setting;
