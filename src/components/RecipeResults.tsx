import React, { useState } from "react";
import { Recipe } from "../types/recipe";
import { useRecipes } from "../hooks/useRecipes";
import Loading from "../components/LoadingComponent";
import Error from "../components/ErrorComponent";
import RecipeCard from "../components/RecipeCard";
import "../assets/styles/components-style/RecipeResults.scss";

interface RecipeResultsProps {
  query: string;
  mealType: string;
  maxCalories: string;
  page: number;
  recipesPerPage: number;
  onPageChange: (newPage: number) => void;
}

export const RecipeResults: React.FC<RecipeResultsProps> = ({
  query,
  mealType,
  maxCalories,
  page,
  recipesPerPage,
  onPageChange,
}) => {
  const [sortBy, setSortBy] = useState("");

  const { data, isLoading, isError } = useRecipes({
    query,
    mealType,
    maxCalories,
    sortBy,
    page,
    recipesPerPage,
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  if (isLoading) return <Loading message="Loading Recipes..." />;
  if (isError) return <Error message="Error Fetching Recipes." />;

  const hasMoreRecipes = data?.length === recipesPerPage;

  return (
    <div>
      <div className="sort-control">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="time">Time</option>
          <option value="popularity">Popularity</option>
          <option value="calories">Calories</option>
        </select>
      </div>

      <div className="recipe-list">
        {data?.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!hasMoreRecipes}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
