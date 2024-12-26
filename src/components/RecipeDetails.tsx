import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaClock,
  FaHamburger,
  FaLeaf,
  FaTag,
  FaUtensils,
} from "react-icons/fa";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import RecipeCard from "./RecipeCard";
import useFetchRecipeDetails from "../hooks/useFetchRecipeDetails";
import NutritionWidget from "./NutritionWidget";
import "../assets/styles/components-style/RecipeDetails.scss";

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipe, similarRecipes, status, error } = useFetchRecipeDetails(
    recipeId as string
  );
  const [showNutrition, setShowNutrition] = useState(true);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  if (status === "loading") {
    return (
      <div className="detail-container">
        <LoadingComponent message="Fetching recipe details..." />
      </div>
    );
  }

  if (status === "error" || !recipe) {
    return (
      <div className="detail-container">
        <ErrorComponent message={error || "Recipe not found!"} />
      </div>
    );
  }

  const toggleSummary = () => setIsSummaryExpanded((prev) => !prev);

  return (
    <div className="recipe-details-page">
      <div className="main-content">
        <header className="recipe-header">
          <h1 className="recipe-title">{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        </header>

        <section className="instructions">
          <h2>How to make:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: recipe.instructions,
            }}
          />
        </section>

        <section className="summary">
          <h2>Recipe Summary:</h2>
          <p className="recipe-summary">
            <span
              dangerouslySetInnerHTML={{
                __html: isSummaryExpanded
                  ? recipe.summary
                  : recipe.summary.substring(0, 200) + "...",
              }}
            />
            <button onClick={toggleSummary} className="read-more-btn">
              {isSummaryExpanded ? "Read Less" : "Read More"}
            </button>
          </p>
        </section>

        <div className="ingredients-nutrition-toggle">
          <button
            onClick={() => setShowNutrition(true)}
            className={showNutrition ? "active" : ""}
          >
            <FaLeaf /> Nutrition
          </button>
          <button
            onClick={() => setShowNutrition(false)}
            className={!showNutrition ? "active" : ""}
          >
            <FaHamburger /> Ingredients
          </button>
        </div>

        <div className="ingredients-nutrition-content">
          {showNutrition ? (
            <NutritionWidget recipeId={Number(recipeId)} />
          ) : (
            <section className="ingredients">
              <h3>Ingredients</h3>
              <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <aside className="sidebar">
        <section className="quick-facts">
          <h3>Quick Facts</h3>
          <ul>
            <li>
              <FaTag /> <strong>Category:</strong> {recipe.dishTypes.join(", ")}
            </li>
            <li>
              <FaClock /> <strong>Cook Time:</strong> {recipe.readyInMinutes}{" "}
              minutes
            </li>
            <li>
              <FaUtensils /> <strong>Servings:</strong> {recipe.servings}
            </li>
            <li>
              <FaLeaf /> <strong>Cuisine:</strong> {recipe.cuisines.join(", ")}
            </li>
          </ul>
        </section>

        <section className="similar-recipes">
          <h3>Similar Recipes</h3>
          <div className="similar-recipes-list">
            {similarRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default RecipeDetails;
