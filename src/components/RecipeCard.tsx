import React, { useState, useEffect } from "react";
import { Recipe } from "../types/recipe";
import "../assets/styles/components-style/RecipeCard.scss";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { FaRegClock, FaStar } from "react-icons/fa";
import { getRecipeDetails } from "../services/API";

interface RecipeCardProps {
  recipe: Recipe;
  addFavorite?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, addFavorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<{
    spoonacularScore: number;
    readyInMinutes: number;
  } | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      checkIfFavorite(currentUser.uid, recipe.id.toString());
    }

    const fetchDetails = async () => {
      try {
        const details = await getRecipeDetails(recipe.id);
        setRecipeDetails({
          spoonacularScore: Math.min(
            Math.max(details.spoonacularScore / 10, 0),
            10
          ),
          readyInMinutes: details.readyInMinutes || 0,
        });
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchDetails();
  }, [recipe.id]);

  const checkIfFavorite = async (userId: string, recipeId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userFavorites = docSnap.data().favorites || [];
      setIsFavorite(userFavorites.includes(recipeId));
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) return;

    const docRef = doc(db, "users", userId);

    try {
      const recipeId = recipe.id.toString();

      if (isFavorite) {
        const userRef = await getDoc(docRef);
        const favorites = userRef.data()?.favorites || [];
        const updatedFavorites = favorites.filter(
          (id: string) => id !== recipeId
        );
        await updateDoc(docRef, { favorites: updatedFavorites });
        setIsFavorite(false);
      } else {
        const userRef = await getDoc(docRef);
        const favorites = userRef.data()?.favorites || [];
        await updateDoc(docRef, { favorites: [...favorites, recipeId] });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }

    if (addFavorite) {
      addFavorite(recipe);
    }
  };

  const renderStars = (rating: number) => {
    const validRating = Math.min(Math.max(rating, 0), 10);
    const scaledRating = validRating / 2;

    return (
      <div className="stars-container">
        {[...Array(5)].map((_, index) => {
          const fillLevel = Math.min(Math.max(scaledRating - index, 0), 1);
          return (
            <div key={index} className="star-wrapper">
              <FaStar className="star unfilled" />
              <FaStar
                className="star filled"
                style={{
                  color: fillLevel > 0 ? "#ffd700" : "#ddd",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 2,
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <img src={recipe.image} alt={recipe.title} />
        <h3>{recipe.title}</h3>
      </Link>

      <div className="recipe-details">
        {recipeDetails && (
          <>
            <div className="rating">
              <strong>Rating: </strong>
              {renderStars(recipeDetails.spoonacularScore)}{" "}
              <span className="rating-number">
                {recipeDetails.spoonacularScore.toFixed(1)}{" "}
              </span>
            </div>

            <div className="cooking-time">
              <FaRegClock />
              <strong>Time:</strong> {recipeDetails.readyInMinutes} minutes
            </div>
          </>
        )}
      </div>

      <div className="heart-icon" onClick={handleFavoriteClick}>
        {isFavorite ? (
          <span role="img" aria-label="filled heart">
            ❤️
          </span>
        ) : (
          <span role="img" aria-label="empty heart">
            🤍
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
