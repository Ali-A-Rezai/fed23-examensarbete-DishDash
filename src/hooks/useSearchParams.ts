import { useState, useEffect, useCallback, useMemo } from "react";

interface SearchParams {
  query: string;
  mealType: string;
  maxCalories: string;
  page: number;
}

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    mealType: "",
    maxCalories: "500",
    page: 1,
  });

  const debouncedSearchParams = useDebounce(searchParams, 500);

  const updateSearchParams = useCallback((name: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetPage = useCallback(() => {
    setSearchParams((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  const shouldFetch = useMemo(() => {
    return Object.values(debouncedSearchParams).some(Boolean);
  }, [debouncedSearchParams]);

  useEffect(() => {
    if (shouldFetch) {
      const fetchData = async () => {
        console.log("Making API call with:", debouncedSearchParams);
      };

      fetchData();
    }
  }, [debouncedSearchParams, shouldFetch]);

  return { searchParams, updateSearchParams, resetPage };
};
