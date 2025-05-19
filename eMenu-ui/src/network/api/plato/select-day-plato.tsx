import { config } from "@/config";

export type selectDayPlatoRequest = {
  id_plato: string;
  fecha: string;
};

export type selectDayPlatoResponse = {
  success: boolean;
  message: string;
  plato: {
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
  };
};

export const selectDayPlato = async ({
  id_plato,
  fecha,
}: selectDayPlatoRequest): Promise<selectDayPlatoResponse> => {
  try {
    const result = await fetch(`${config.api.url}/select_day_plate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_plato,
        fecha,
      }),
    });

    if (!result.ok) {
      throw new Error("");
    }

    const response: selectDayPlatoResponse = await result.json();

    if (response.success === false) {
      console.log(response.message);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
