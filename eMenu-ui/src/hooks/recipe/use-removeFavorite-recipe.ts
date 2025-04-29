import { useRemoveFavoriteRecipe } from "@/network/hooks/recipe/removeFavorite-recipe";

export const useRemoveFavoriteRecipeHook = () => {
  const { isPending, data, mutate, status } = useRemoveFavoriteRecipe();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
