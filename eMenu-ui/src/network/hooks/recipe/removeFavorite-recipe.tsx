import { useMutation } from "@tanstack/react-query";
import {
  removeFavoriteRecipe,
  removeFavoriteRecipeRequest,
  removeFavoriteRecipeResponse,
} from "@/network/api/recipe/removeFavorite-recipe";

export const useRemoveFavoriteRecipe = () => {
  return useMutation<
    removeFavoriteRecipeResponse,
    Error,
    removeFavoriteRecipeRequest
  >({
    mutationFn: removeFavoriteRecipe,
  });
};
