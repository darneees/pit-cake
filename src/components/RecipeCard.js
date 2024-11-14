import React from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './shareButton';

const RecipeCard = ({ recipe, onFavorite }) => {
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.description}</p>
            <FavoriteButton onClick={() => onFavorite(recipe.id)} />
            <ShareButton recipeId={recipe.id} />
        </div>
    );
};

export default RecipeCard;