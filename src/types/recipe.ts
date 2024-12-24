export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  summary: string;
  servings: number;
  readyInMinutes: number;
  pricePerServing: number;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  instructions: string;
  sourceUrl: string;
  spoonacularScore: number;
  mealType?: string;
  calories?: number;
}

export interface RecipeSearchResults {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeDetails {
  id: number;
  title: string;
  summary: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string;
  healthScore: number;
  preparationMinutes: number;
  cookingMinutes: number;
  servings: number;
  pricePerServing: number;
  image: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  sourceUrl: string;
  spoonacularScore: number;
  readyInMinutes: number;
}

export interface NutritionInfo {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  cholesterol: number;
  sodium: number;
  fiber: number;
  sugars: number;
}

export interface RecipesByIngredients {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredients: { name: string; amount: number; unit: string }[];
  missedIngredients: { name: string; amount: number; unit: string }[];
}

export interface FavoriteRecipe {
  recipeId: number;
}
