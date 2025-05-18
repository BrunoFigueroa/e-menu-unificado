import { config } from "@/config";

export type placeOrderRequest = {
  pedido: string;
};

export type placeOrderResponse = {
  orderID: string;
  success: boolean;
  message: string;
};

export const placeOrder = async ({
  pedido,
}: placeOrderRequest): Promise<placeOrderResponse> => {
  try {
    const result = await fetch(`${config.api.url}/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pedido,
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
