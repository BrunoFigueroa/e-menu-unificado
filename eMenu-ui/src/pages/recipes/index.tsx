import React, { Fragment, ReactElement, useState, useEffect } from "react";
import LandingLayout from "@/components/layout/landing/layout";
import Recipes from "@/components/recipes";
import { useSession } from "next-auth/react";
import { useSearchRecipeHook } from "@/hooks/recipe/use-search-recipe";
import { useAddFavoriteRecipeHook } from "@/hooks/recipe/use-addFavorite-recipe";
import { useRemoveFavoriteRecipeHook } from "@/hooks/recipe/use-removeFavorite-recipe";
import { useRetrieveProfileUserHook } from "@/hooks/user/use-retrieve-profile-user";

interface Recipe {
  id: number;
  usuarioid: number;
  nombre: string;
  ingredientes: string;
  categoria: string;
  preparacion: string;
  tiempo: string;
  votos: number;
}

const RecipesView = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const {
    data: userData,
    isPending: userIsPending,
    isFetching: userIsFetching,
    isError: userIsError,
    error: userError,
  } = useRetrieveProfileUserHook({ id: userId });

  const { data, isPending, isFetching, isError, error } = useSearchRecipeHook(
    {}
  );

  const [favorites, setFavorites] = useState<number[]>([]);
  const { mutate: addFavoriteRecipe } = useAddFavoriteRecipeHook();
  const { mutate: removeFavoriteRecipe } = useRemoveFavoriteRecipeHook();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (data?.recipes) {
      setRecipes(
        data.recipes.map((recipe) => ({
          id: Number(recipe.recetaid),
          usuarioid: Number(recipe.usuarioid),
          nombre: recipe.nombre,
          ingredientes: recipe.ingredientes,
          categoria: recipe.categoria,
          preparacion: recipe.pasos,
          tiempo: recipe.tiempo,
          votos: Number(recipe.votos),
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (userData?.favorites) {
      setFavorites(
        Array.isArray(userData.favorites)
          ? userData.favorites.map((fav) => Number(fav.recetaid))
          : []
      );
    }
  }, [userData]);

  const handleFavorite = (recipeId: number) => {
    if (favorites.includes(recipeId)) {
      removeFavoriteRecipe(
        { recetaid: recipeId.toString(), usuarioid: userId },
        {
          onSuccess: () => {
            setFavorites(favorites.filter((id) => id !== recipeId));
            setRecipes((prevRecipes) =>
              prevRecipes.map((recipe) =>
                recipe.id === recipeId
                  ? { ...recipe, votos: recipe.votos - 1 }
                  : recipe
              )
            );
          },
          onError: (error) => {
            console.error("Error al quitar de favoritos:", error.message);
          },
        }
      );
    } else {
      addFavoriteRecipe(
        { recetaid: recipeId.toString(), usuarioid: userId },
        {
          onSuccess: () => {
            setFavorites([...favorites, recipeId]);
            setRecipes((prevRecipes) =>
              prevRecipes.map((recipe) =>
                recipe.id === recipeId
                  ? { ...recipe, votos: recipe.votos + 1 }
                  : recipe
              )
            );
          },
          onError: (error) => {
            console.error("Error al agregar a favoritos:", error.message);
          },
        }
      );
    }
  };

  if (isPending || isFetching) {
    return <div className="font-mono py-4">Cargando recetas...</div>;
  }

  if (isError) {
    return <div className="font-mono py-4">Error: {error?.message}</div>;
  }

  return (
    <Fragment>
      <div className="py-8 mx-40 text-xl rounded-lg bg-gray-100">
        <Recipes
          recipes={recipes}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </div>
    </Fragment>
  );
};

RecipesView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default RecipesView;
