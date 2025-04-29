import { useAddFavoriteRecipe } from "@/network/hooks/recipe/addFavorite-recipe";

export const useAddFavoriteRecipeHook = () => {
  const { isPending, data, mutate, status } = useAddFavoriteRecipe();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
