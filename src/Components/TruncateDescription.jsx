import React, { useState } from 'react';

const TruncateDescription = ({ description, wordLimit = 20 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle empty or null description
  if (!description) return null;
  

  //putting it in one and comparing it
  const words = description.split(" ");
  const shouldTruncate = words.length > wordLimit;

  //make the read more function activate
  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  if (!shouldTruncate) {
    return <span>{description}</span>;
  }

  return (
    <span className="text-gray-700">
      {isExpanded ? (
        <>
          {description}
          <button
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