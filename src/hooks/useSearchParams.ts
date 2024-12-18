import { useState } from "react";

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    mealType: "",
    maxCalories: "500",
    page: 1,
  });

  const updateSearchParams = (name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPage = () => {
    setSearchParams((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  return { searchParams, updateSearchParams, resetPage };
};
