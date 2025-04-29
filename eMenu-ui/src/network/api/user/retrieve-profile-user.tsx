import { config } from "@/config";

export type retrieveProfileUserRequest = {
  id: string;
};

export type retrieveProfileUserResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
  };
  recipes: {
    id: string;
    usuario_id: string;
    nombre: string;
    ingredientes_id: string;
    categoria_id: string;
    preparacion: string;
    tiempo: string;
    votos: string;
  };
  favorites: {
    id: string;
    usuario_id: string;
    recipe_id: string;
  };
};

export const retrieveProfileUser = async ({
  id,
}: retrieveProfileUserRequest): Promise<retrieveProfileUserResponse> => {
  try {
    const result = await fetch(`${config.api.url}/user_profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Error al obtener el perfil del usuario.");
    }

    const response: retrieveProfileUserResponse = await result.json();

    if (!response.success) {
        throw new Error(response.message || "No se pudo obtener el perfil.");
      }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
