import { config } from "@/config";


type CreatePlatoRequest = {
  id_categoria: number;
  nombre: string;
  precio: number;
  descripcion: string;
  tiempo_estimado: string;
  imagen_url: string;
  disponible: boolean;
  creado_por_admin_id: number;
  modificado_por_admin_id: number;
};

type CreatePlatoResponse = {
  success: boolean;
  data: {
    id_plato: number;
    id_categoria: number;
    nombre: string;
    precio: number;
    descripcion: string;
    tiempo_estimado: string;
    imagen_url: string;
    disponible: boolean;
    creado_por_admin_id: number;
    modificado_por_admin_id: number;
  };
};

export const createPlato = async (
  data: CreatePlatoRequest
): Promise<CreatePlatoResponse> => {
  try {
    const response = await fetch(`http://localhost:8080/create_plato`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const result: CreatePlatoResponse = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error en createPlato:", error);
    throw error;
  }
};
