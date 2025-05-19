import { config } from "@/config";

export type placeOrderRequest = {
  fecha_hora: string;
  mesa: string;
  id_estado_pedido: string;
  tiempo_espera_actualizado: string;
  comentarios: string;
};

export type placeOrderResponse = {
  orderID: string;
  success: boolean;
  message: string;
  pedido: {
    id_pedido: string;
    fecha_hora: string;
    mesa: string;
    id_estado_pedido: string;
    tiempo_espera_actualizado: string;
    comentarios: string;
  };
};

export const placeOrder = async ({
  fecha_hora,
  mesa,
  id_estado_pedido,
  tiempo_espera_actualizado,
  comentarios,
}: placeOrderRequest): Promise<placeOrderResponse> => {
  try {
    const result = await fetch(`${config.api.url}/create_pedido`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_hora,
        mesa,
        id_estado_pedido,
        tiempo_espera_actualizado,
        comentarios,
      }),
    });

    if (!result.ok) {
      throw new Error("Error al realizar el pedido.");
    }

    const response: placeOrderResponse = await result.json();

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
