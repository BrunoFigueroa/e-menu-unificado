import { config } from "@/config";

export type removeFavoriteRecipeRequest = {
  recetaid: string;
  usuarioid: string;
};

export type removeFavoriteRecipeResponse = {
  success: boolean;
  message: string;
};

export const removeFavoriteRecipe = async ({
  recetaid,
  usuarioid,
}: removeFavoriteRecipeRequest): Promise<removeFavoriteRecipeResponse> => {
  try {
    const result = await fetch(
      `${config.api.url}/remove_favorite?recipeId=${recetaid}&userId=${usuarioid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!result.ok) {
      throw new Error("Error al eliminar a favoritos.");
    }

    const response: removeFavoriteRecipeResponse = await result.json();

    if (!response.success) {
      throw new Error(response.message || "No se pudo eliminar a favoritos.");
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
