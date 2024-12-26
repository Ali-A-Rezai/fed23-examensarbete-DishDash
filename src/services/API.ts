import axios from "axios";
import {
  Recipe,
  RecipeSearchResults,
  RecipeDetails,
  RecipesByIngredients,
  NutritionInfo,
} from "../types/recipe";
import { db, collection, addDoc } from "../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes";
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
const numberOfRecipes = 8;

if (!apiKey) {
  throw new Error("Spoonacular API key is missing🚨");
}

// Reusable function to fetch data from Spoonacular API
const fetchApi = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Error while fetching data");
  }
};

// Hämtar slumpmässiga recept från Spoonacular API
export const getRandomRecipes = async (): Promise<Recipe[]> => {
  const url = `${SPOONACULAR_API_URL}/random?apiKey=${apiKey}&number=${numberOfRecipes}`;

  const data = await fetchApi<{ recipes: Recipe[] }>(url);
  return data.recipes;
};

// Söker efter recept baserat på en specifik textfråga
export const searchRecipes = async (
  query: string
): Promise<RecipeSearchResults> => {
  const url = `${SPOONACULAR_API_URL}/complexSearch?query=${query}&apiKey=${apiKey}`;
  return await fetchApi<RecipeSearchResults>(url);
};

// Hämtar detaljerad information om ett specifikt recept
export const getRecipeDetails = async (
  recipeId: number
): Promise<RecipeDetails> => {
  const url = `${SPOONACULAR_API_URL}/${recipeId}/information?apiKey=${apiKey}`;
  return await fetchApi<RecipeDetails>(url);
};

// Söker recept som kan lagas med de angivna ingredienserna
export const getRecipesByIngredients = async (
  ingredients: string[]
): Promise<RecipesByIngredients[]> => {
  const ingredientString = ingredients.join(",");
  const url = `${SPOONACULAR_API_URL}/findByIngredients?ingredients=${ingredientString}&apiKey=${apiKey}`;
  return await fetchApi<RecipesByIngredients[]>(url);
};

// Söker efter recept baserat på en specifik måltidstyp
export const searchRecipesByMealType = async (
  mealType: string
): Promise<RecipeSearchResults> => {
  const url = `${SPOONACULAR_API_URL}/complexSearch?mealType=${mealType}&apiKey=${apiKey}`;
  return await fetchApi<RecipeSearchResults>(url);
};

// Söker efter recept som håller sig inom en viss kalorigräns
export const getRecipesByCalorieLimit = async (
  calories: number
): Promise<RecipeSearchResults> => {
  const url = `${SPOONACULAR_API_URL}/complexSearch?maxCalories=${calories}&apiKey=${apiKey}`;
  return await fetchApi<RecipeSearchResults>(url);
};

// Hämtar näringsinformation för ett recept baserat på recipeId
export const getNutritionInfo = async (
  recipeId: number
): Promise<NutritionInfo> => {
  const url = `${SPOONACULAR_API_URL}/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;
  return await fetchApi<NutritionInfo>(url);
};

// Sparar ett recept som favorit för en användare
export const saveFavoriteRecipe = async (
  userId: string,
  recipeId: number
): Promise<void> => {
  try {
    const favoriteRecipesCollection = collection(
      db,
      "users",
      userId,
      "favorites"
    );

    await addDoc(favoriteRecipesCollection, {
      recipeId: recipeId,
      savedAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving favorite recipe:", error);
    throw new Error("Error saving favorite recipe");
  }
};

// Update user profile function
export const updateUserProfile = async (updatedUser: {
  displayName: string;
  email: string;
  userId: string;
}) => {
  try {
    const userRef = doc(db, "users", updatedUser.userId);
    await updateDoc(userRef, {
      displayName: updatedUser.displayName,
      email: updatedUser.email,
    });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
};

export const fetchFilteredRecipes = async ({
  query = "",
  mealType = "",
  maxCalories = 0,
  sortBy = "",
  offset = 0,
  number = 5,
}: {
  query?: string;
  mealType?: string;
  maxCalories?: number;
  sortBy?: string;
  offset?: number;
  number?: number;
}): Promise<RecipeSearchResults> => {
  const params = new URLSearchParams({
    apiKey,
    query,
    offset: offset.toString(),
    number: number.toString(),
  });

  if (mealType) params.append("mealType", mealType);
  if (maxCalories) params.append("maxCalories", maxCalories.toString());
  if (sortBy) params.append("sort", sortBy);

  const url = `${SPOONACULAR_API_URL}/complexSearch?${params.toString()}`;
  return await fetchApi<RecipeSearchResults>(url);
};

export const getSimilarRecipes = async (
  recipeId: number
): Promise<Recipe[]> => {
  const url = `${SPOONACULAR_API_URL}/${recipeId}/similar?apiKey=${apiKey}&number=4`;
  const recipes = await fetchApi<Recipe[]>(url);

  // Add the full image URL to each recipe object
  const recipesWithImage = recipes.map((recipe) => ({
    ...recipe,
    image: `https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`,
  }));

  return recipesWithImage;
};

// Fetch Nutrition Widget HTML
export const getRecipeNutritionWidget = async (
  recipeId: number,
  useDefaultCss: boolean = true
): Promise<string> => {
  const url = `${SPOONACULAR_API_URL}/${recipeId}/nutritionWidget?apiKey=${apiKey}&defaultCss=${useDefaultCss}`;
  try {
    const response = await axios.get<string>(url, {
      headers: { Accept: "text/html" },
    });
    return response.data; // HTML content as a string
  } catch (error) {
    console.error("Error fetching nutrition widget:", error);
    throw new Error("Unable to fetch nutrition widget");
  }
};
