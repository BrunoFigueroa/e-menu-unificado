
import { config } from "@/config";

export type retrieveMenuDelDiaResponse = {
  success: boolean;
  message: string;
  menu: {
    dia: string;
    platos: { nombre: string; precio: number }[];
  };
};

const getDiaSemana = (): string => {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  return dias[new Date().getDay()];
};

export const retrieveMenuDelDia = async (): Promise<retrieveMenuDelDiaResponse> => {
  const dia = getDiaSemana();

  try {
    const result = await fetch(`${config.api.url}/menu/del-dia?dia=${dia}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Error al obtener el menú del día.");
    }

    const response: retrieveMenuDelDiaResponse = await result.json();

    if (!response.success) {
      throw new Error(response.message || "No se pudo obtener el menú.");
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
