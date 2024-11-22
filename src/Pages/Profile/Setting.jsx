import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '../../Hook/useStorage';
import { projectAuth, projectFirebase, firebase } from '../../firebase/config';
import { useAuthContext } from '../../Hook/useAuthContext';

const Setting = () => {
    const [profile, setProfile] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { uploadMedia, urls, paths } = useStorage("users");
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()

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

            // Update the displayName and optionally the photoURL if a new image was uploaded
            const profileUpdateData = {
               
            };
            if (displayName){
                profileUpdateData.displayName = displayName;
            }

            if (urls[0]) {
                profileUpdateData.photoURL = urls[0];
            }

            await user.updateProfile(profileUpdateData);

            // Update Firestore document
            await projectFirebase
                .collection("users")
                .doc(user.uid)
                .update({
                    ...profileUpdateData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                });

            dispatch({ type: 'LOGIN', payload: user });
            if (displayName || urls[0]){
            setIsUpdated(true);
            }
            else {
                alert("You haven't entered information in the field")
            }
            return true;

        } catch (error) {
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
            if (isSubmitted) {
                try {
                    await handleUserChanges();
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
           
            {isUpdated && (
                <Alert variant="success" onClose={() => setIsUpdated(false)} dismissible>
                    Update is successful
                </Alert>
            )}
            {isUpdated && setTimeout(() => setIsUpdated(false), 5000)}
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
                <Form.Group controlId="formUsername" className='mt-2 mb-2'>
                    <Form.Label>Profile Picture (Optional)</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleProfile}
                    />
                </Form.Group>
                <Button variant="primary" className='custom-button mt-2' type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button className='custom-button mt-2' onClick={() => navigate(-1)}>Back</Button>
            </Form>
        </Container>
    );
};

export default Setting;
