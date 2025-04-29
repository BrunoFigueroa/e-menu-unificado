import { useMutation } from "@tanstack/react-query";
import {
  addFavoriteRecipe,
  addFavoriteRecipeRequest,
  addFavoriteRecipeResponse,
} from "@/network/api/recipe/addFavorite-recipe";

export const useAddFavoriteRecipe = () => {
  return useMutation<
    addFavoriteRecipeResponse,
    Error,
    addFavoriteRecipeRequest
  >({
    mutationFn: addFavoriteRecipe,
  });
};
