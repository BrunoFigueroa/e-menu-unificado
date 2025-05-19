import { config } from "@/config";

export type searchPlatoRequest = {};

export type searchPlatoResponse = {
  success: boolean;
  message: string;
  platos: {
    id_plato: string;
    id_categoria: string;
    nombre: string;
    descripcion: string;
    precio: string;
    tiempo_estimado: string;
    imagen_url: string;
    disponible: boolean;
    creado_por_admin_id: string;
    modificado_por_admin_id: string;
  }
};

export const searchPlato =
  async ({}: searchPlatoRequest): Promise<searchPlatoResponse> => {
    try {
      const result = await fetch(`${config.api.url}/read_platos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!result.ok) {
        throw new Error("Error al obtener los platos.");
      }

      const response: searchPlatoResponse = await result.json();

      if (!response.success) {
        throw new Error(response.message || "No se pudo obtener los platos.");
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Ocurrió un error desconocido.");
    }
  };
