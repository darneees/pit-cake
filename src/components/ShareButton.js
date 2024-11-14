import React from 'react';

const ShareButton = ({ recipeId }) => {
    const handleShare = () => {
        const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
        navigator.share ? navigator.share({ url: shareUrl }) : alert(`Compartilhe: ${shareUrl}`);
    };

    return <button onClick={handleShare}>Compartilhar</button>;
};

export default ShareButton;