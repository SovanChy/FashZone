import React, { useState } from 'react';

const TruncateDescription = ({ description, wordLimit = 40 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle empty, null, or non-string description
  if (!description || typeof description !== 'string') {
    return null;
  }
  
  // Insert space every 20 characters if no spaces found
  const processedDescription = description.includes(' ') 
    ? description 
    : description.replace(/(.{20})/g, "$1 ");
  
  // Trim the description and split into words
  const words = processedDescription.trim().split(/\s+/);
  const shouldTruncate = words.length > wordLimit;
  
  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };
  
  if (!shouldTruncate) {
    return <span className="text-gray-700">{description}</span>;
  }
  
  return (
    <span className="text-gray-700">
      {isExpanded ? (
        <>
          {description}
          <button
            type="button"
            onClick={toggleExpand}
            className="ml-1 text-red-800 hover:text-red-600 font-medium cursor-pointer"
          >
            Show less
          </button>
        </>
      ) : (
        <>
          {words.slice(0, wordLimit).join(" ")}...
          <button
            type="button"
            onClick={toggleExpand}
            className="ml-1 text-red-800 hover:text-red-600 font-medium cursor-pointer"
          >
            Read more
          </button>
        </>
      )}
    </span>
  );
};

export default TruncateDescription;