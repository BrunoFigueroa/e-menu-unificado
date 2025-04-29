import { useQuery } from "@tanstack/react-query";
import {
  searchRecipe,
  searchRecipeRequest,
  searchRecipeResponse,
} from "@/network/api/recipe/search-recipe";

export const useSearchRecipe = (
  request: searchRecipeRequest,
  initialData?: searchRecipeResponse
) => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: () => searchRecipe(request),
    initialData,
    enabled: true,
  });
};
