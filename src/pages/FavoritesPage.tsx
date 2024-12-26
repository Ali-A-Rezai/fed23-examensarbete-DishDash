import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Recipe } from "../types/recipe";
import { getRecipeDetails } from "../services/API";
import "../assets/styles/Pages-style/FavoritesPage.scss";
import "../assets/styles/components-style/RecipeCard.scss";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import RecipeCard from "../components/RecipeCard";

const FavoritesPage: React.FC = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { favorites = [] } = userDocSnap.data();
          fetchRecipes(favorites);
        }
      } catch (error) {
        setError("Failed to fetch favorite recipes. Please try again later.");
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchRecipes = async (favoriteIds: string[]) => {
      try {
        const recipes = await Promise.all(
          favoriteIds.map(async (id) => {
            const recipeDetails = await getRecipeDetails(Number(id));
            return {
              id: Number(id),
              title: recipeDetails.title,
              image: recipeDetails.image,
              imageType: "",
              summary: "",
              servings: 0,
              readyInMinutes: 0,
              pricePerServing: 0,
              cuisines: [],
              dishTypes: [],
              diets: [],
              instructions: "",
              sourceUrl: "",
              spoonacularScore: 0,
            };
          })
        );

        setFavoriteRecipes(recipes);
      } catch (error) {
        setError("Error fetching recipe details. Please try again later.");
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingComponent message="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <ErrorComponent message={error} />
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You have no favorite recipes yet.</p>
      ) : (
        <div className="favorites-list">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
