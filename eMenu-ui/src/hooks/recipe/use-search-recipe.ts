import { useSearchRecipe } from "@/network/hooks/recipe/search-recipe";
import {
  searchRecipeRequest,
  searchRecipeResponse,
} from "@/network/api/recipe/search-recipe";

export const useSearchRecipeHook = (
  request: searchRecipeRequest,
  initialData?: searchRecipeResponse
) => {
  const { data, isPending, isFetching, isError, error, refetch } =
    useSearchRecipe(request, initialData);

  return {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};
