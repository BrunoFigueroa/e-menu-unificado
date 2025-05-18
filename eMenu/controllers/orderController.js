import { createOrder, getOrder } from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { pedido } = req.body;

  try {
    const order = await createOrder(pedido);

    console.log(`Pedido registrado con éxito: ${pedido}`);

    res.status(200).json({
      orderID: order.orderid,
      success: true,
      message: "Pedido registrado con éxito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Hubo un error al registrar el pedido",
    });
  }
};

export const retrieveOrder = async (req, res) => {
  const { orderID } = req.params;

  try {
    const order = await getOrder(orderID);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Hubo un error al recuperar el pedido",
    });
  }
};
