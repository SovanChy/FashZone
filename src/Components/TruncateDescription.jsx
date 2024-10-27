import React, { useState } from 'react';

const truncateDescription = (description, wordLimit = 20) => {
  if (!description || typeof description !== 'string') {
    return '';
  }

  const processedDescription = description.includes(' ') 
    ? description 
    : description.replace(/(.{20})/g, "$1 ");

  const words = processedDescription.trim().split(/\s+/);
  const shouldTruncate = words.length > wordLimit;

  return shouldTruncate ? words.slice(0, wordLimit).join(" ") + '...' : description;
};

const TruncateDescription = ({ description, wordLimit = 20 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  if (!description || typeof description !== 'string') {
    return null;
  }

  const truncatedDescription = truncateDescription(description, wordLimit);

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
          {truncatedDescription}
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

export { truncateDescription };
export default TruncateDescription;