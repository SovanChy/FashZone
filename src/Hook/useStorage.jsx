import { useState } from 'react';
import { projectStorage } from '../firebase/config';

export const useStorage = (folderPath) => {
    const [urls, setUrls] = useState([]);
    const [paths, setPaths] = useState([]);
    const [error, setError] = useState('');

    const uploadMedia = async (files) => {
        const uploadedUrls = [];
        const uploadedPaths = [];

        try {
            for (const file of files) {
                const mediaType = file.type.startsWith('image/') ? 'images' : 'videos';
                const fullPath = `${folderPath}/${mediaType}/${Date.now()}_${file.name}`;
                
                console.log("Uploading file to path:", fullPath);
                
                // Start the upload process
                const storageRef = projectStorage.ref(fullPath);
                const uploadTaskSnapshot = await storageRef.put(file);
                
                // Get the download URL after the upload
                const downloadUrl = await uploadTaskSnapshot.ref.getDownloadURL();

                // Store the URL and path for the uploaded media
                uploadedUrls.push(downloadUrl);
                uploadedPaths.push(fullPath);
                console.log("Upload successful. URL:", downloadUrl, "Path:", fullPath);
            }

            // Set the URLs and paths for all uploaded media
            setUrls(uploadedUrls);
            setPaths(uploadedPaths);

        } catch (error) {
            console.error("Error during file upload:", error);
            setError(error.message);
        }
    };

    return { uploadMedia, urls, paths, error };
};
