import React from "react";
import { Recipe } from "../types/recipe";
import "../assets/styles/components-style/RecipeCard.scss";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        View Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
