import { useCallback } from 'react';

const useTimestampFormat = () => {
    const formatTimestamp = useCallback((timestamp) => {
        if (timestamp && timestamp.toDate) {
            const date = timestamp.toDate();
            const now = new Date();
            const diffInMs = now - date;
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

            if (diffInMinutes < 60) {
                return `${diffInMinutes} minutes ago`;
            } else if (diffInHours < 24) {
                return `${diffInHours} hours ago`;
            } else {
                const day = date.getDate();
                const month = date.toLocaleString("default", { month: "long" });
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                return `${hours}:${minutes} at ${day} ${month} ${year}`;
            }
        }
        return "No date available";
    }, []);

    return { formatTimestamp };
};

export default useTimestampFormat;
