import { useQuery } from "@tanstack/react-query";
import { fetchFilteredRecipes } from "../services/API";
import { Recipe } from "../types/recipe";

interface UseRecipesProps {
  query: string;
  mealType: string;
  maxCalories: string;
  sortBy: string;
  page: number;
  recipesPerPage: number;
}

export const useRecipes = ({
  query,
  mealType,
  maxCalories,
  sortBy,
  page,
  recipesPerPage,
}: UseRecipesProps) => {
  return useQuery({
    queryKey: ["recipes", query, mealType, maxCalories, sortBy, page],
    queryFn: async () => {
      const response = await fetchFilteredRecipes({
        query,
        mealType,
        maxCalories: Number(maxCalories),
        sortBy,
        offset: (page - 1) * recipesPerPage,
        number: recipesPerPage,
      });
      return response;
    },
    select: (data: { results: Recipe[] }) => data.results,
  });
};
