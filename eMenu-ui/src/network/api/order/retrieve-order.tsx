import { config } from "@/config";

export type retrieveOrderRequest = {
  orderID: string;
};

export type retrieveOrderResponse = {
  success: boolean;
  message: string;
  order: {
    orderid: string;
    pedido: string;
  };
};

export const retrieveOrder = async ({
  orderID,
}: retrieveOrderRequest): Promise<retrieveOrderResponse> => {
  try {
    const result = await fetch(`${config.api.url}/order/${orderID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Error al obtener el pedido.");
    }

    const response: retrieveOrderResponse = await result.json();

    if (!response.success) {
        throw new Error(response.message || "No se pudo obtener el pedido.");
      }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
