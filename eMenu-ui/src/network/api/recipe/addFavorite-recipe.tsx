import { config } from "@/config";

export type addFavoriteRecipeRequest = {
  recetaid: string;
  usuarioid: string;
};

export type addFavoriteRecipeResponse = {
  success: boolean;
  message: string;
};

export const addFavoriteRecipe = async ({
  recetaid,
  usuarioid,
}: addFavoriteRecipeRequest): Promise<addFavoriteRecipeResponse> => {
  try {
    const result = await fetch(
      `${config.api.url}/add_favorite?recipeId=${recetaid}&userId=${usuarioid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!result.ok) {
      throw new Error("Error al agregar a favoritos.");
    }

    const response: addFavoriteRecipeResponse = await result.json();

    if (!response.success) {
      throw new Error(response.message || "No se pudo agregar a favoritos.");
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
