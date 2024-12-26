/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  getRecipeDetails,
  getSimilarRecipes,
  getNutritionInfo,
} from "../services/API";
import {
  RecipeDetails as RecipeDetailsType,
  Recipe,
  NutritionInfo,
} from "../types/recipe";

const useFetchRecipeDetails = (recipeId: string) => {
  const [recipe, setRecipe] = useState<RecipeDetailsType | null>(null);
  const [nutrition, setNutrition] = useState<NutritionInfo | null>(null);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!recipeId) return;
    try {
      setStatus("loading");

      const details = await getRecipeDetails(parseInt(recipeId));
      setRecipe(details);

      const nutritionInfo = await getNutritionInfo(parseInt(recipeId));
      setNutrition(nutritionInfo);

      const similar = await getSimilarRecipes(parseInt(recipeId));
      setSimilarRecipes(similar);

      setStatus("success");
    } catch (err) {
      setError("Failed to fetch recipe details or similar recipes.");
      setStatus("error");
    }
  }, [recipeId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { recipe, nutrition, similarRecipes, status, error };
};

export default useFetchRecipeDetails;
