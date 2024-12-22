import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getRandomRecipes } from "../services/API";
import { Recipe } from "../types/recipe";
import RecipeCard from "./RecipeCard";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import scroll from "../utils/scroll";
import "../assets/styles/components-style/PopularRecipes.scss";

interface FavoriteRecipesProps {
  loadingMessage?: string;
  errorMessage?: string;
  scrollAmount?: number;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = () => {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const { data, isLoading, isError, error } = useQuery<Recipe[], Error>({
    queryKey: ["randomRecipes"],
    queryFn: getRandomRecipes,
    staleTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <motion.section
      className="popular-recipes"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 1, ease: easing }}
    >
      <h2 className="section-title">Popular Recipes</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll("left")}>
          &#8592;
        </button>

        <div id="recipe-container" className="recipe-scroll-container">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((recipe: Recipe) => (
              <motion.div
                key={recipe.id}
                className="recipe-card-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: easing }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>

        <button className="scroll-button right" onClick={() => scroll("right")}>
          &#8594;
        </button>
      </div>

      {isLoading && <LoadingComponent />}
      {isError && error instanceof Error && <ErrorComponent />}
    </motion.section>
  );
};

export default FavoriteRecipes;
