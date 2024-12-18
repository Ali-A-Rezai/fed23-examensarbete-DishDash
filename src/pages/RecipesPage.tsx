import React, { useState } from "react";
import { RecipeResults } from "../components/RecipeResults";
import "../assets/styles/Pages-style/RecipesPage.scss";
import { useSearchParams } from "../hooks/useSearchParams";

const RecipePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [maxCalories, setMaxCalories] = useState("500");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { searchParams, updateSearchParams, resetPage } = useSearchParams();

  const recipesPerPage = 5;

  const handleSearch = () => {
    setIsSearchClicked(true);
    updateSearchParams("query", query);
    updateSearchParams("mealType", mealType);
    updateSearchParams("maxCalories", maxCalories);
    resetPage();
  };

  const handleFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "mealType") {
      setMealType(value);
    }
    if (name === "maxCalories") {
      setMaxCalories(value);
    }
    updateSearchParams(name, value);
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams("page", newPage.toString());
  };

  const toggleFilters = () => {
    setIsFilterActive((prev: boolean) => !prev);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="recipe-page">
      <h1>Recipe Finder</h1>
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="filter-toggle">
          <button className="toggle-btn" onClick={toggleFilters}>
            {isFilterActive ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isFilterActive && (
          <div className="filters">
            <div className="filter-item">
              <label htmlFor="mealType">Meal Type:</label>
              <select
                name="mealType"
                id="mealType"
                value={mealType}
                onChange={handleFilter}
              >
                <option value="">All Meal Types</option>
                <option value="main course">Main Course</option>
                <option value="side dish">Side Dish</option>
                <option value="dessert">Dessert</option>
                <option value="breakfast">Breakfast</option>
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="maxCalories">Max Calories:</label>
              <select
                name="maxCalories"
                id="maxCalories"
                value={maxCalories}
                onChange={handleFilter}
              >
                <option value="100">100 kcal</option>
                <option value="200">200 kcal</option>
                <option value="300">300 kcal</option>
                <option value="400">400 kcal</option>
                <option value="500">500 kcal</option>
                <option value="600">600 kcal</option>
                <option value="700">700 kcal</option>
                <option value="800">800 kcal</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {isSearchClicked && (
        <RecipeResults
          query={searchParams.query}
          mealType={searchParams.mealType}
          maxCalories={searchParams.maxCalories}
          page={searchParams.page}
          recipesPerPage={recipesPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RecipePage;
