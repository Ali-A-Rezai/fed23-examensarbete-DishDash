import React, { useEffect, useState } from "react";
import { getRecipeNutritionWidget } from "../services/API";

interface NutritionWidgetProps {
  recipeId: number;
}

const NutritionWidget: React.FC<NutritionWidgetProps> = ({ recipeId }) => {
  const [nutritionHtml, setNutritionHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const html = await getRecipeNutritionWidget(recipeId);
        setNutritionHtml(html);
      } catch (error) {
        console.error("Error fetching nutrition widget:", error);
      }
    };

    fetchNutrition();
  }, [recipeId]);

  useEffect(() => {
    if (nutritionHtml) {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = nutritionHtml;

      const targetDivs = tempContainer.querySelectorAll("div");

      targetDivs.forEach((div) => {
        if (div.textContent?.includes("Widget by spoonacular.com")) {
          div.style.display = "none";
        }
      });

      setNutritionHtml(tempContainer.innerHTML);
    }
  }, [nutritionHtml]);

  return (
    <section className="nutrition-widget">
      <h3>Nutrition Information</h3>
      {nutritionHtml ? (
        <div dangerouslySetInnerHTML={{ __html: nutritionHtml }} />
      ) : (
        <p>Loading nutrition information...</p>
      )}
    </section>
  );
};

export default NutritionWidget;
