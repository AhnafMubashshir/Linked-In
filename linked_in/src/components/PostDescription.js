import React, { useState } from 'react';

const MaxDescriptionLength = 300;

const PostDescription = ({ fullDescription }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleClick = () => {
        setShowFullDescription(!showFullDescription);
    };

    const descriptionToDisplay = showFullDescription
        ? fullDescription
        : fullDescription.length > MaxDescriptionLength
            ? `${fullDescription.slice(0, MaxDescriptionLength)}...`
            : fullDescription;

    return (
        <div>
            <p>{descriptionToDisplay}
                <span>
                    {fullDescription.length > MaxDescriptionLength && (
                        <span onClick={handleClick} style={{ cursor: 'pointer', color: 'GrayText' }}>
                            {showFullDescription ? ' See Less' : ' See More'}
                        </span>
                    )}
                </span>
            </p>
        </div>
    );
};

export default PostDescription;
