import { config } from "@/config";

export type searchRecipeRequest = {};

export type searchRecipeResponse = {
  success: boolean;
  message: string;
  recipes: {
    recetaid: string;
    usuarioid: string;
    nombre: string;
    ingredientes: string;
    categoria: string;
    pasos: string;
    tiempo: string;
    votos: string;
  }[];
};

export const searchRecipe =
  async ({}: searchRecipeRequest): Promise<searchRecipeResponse> => {
    try {
      const result = await fetch(`${config.api.url}/recipes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!result.ok) {
        throw new Error("Error al obtener las recetas.");
      }

      const response: searchRecipeResponse = await result.json();

      if (!response.success) {
        throw new Error(response.message || "No se pudo obtener las recetas.");
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Ocurrió un error desconocido.");
    }
  };
