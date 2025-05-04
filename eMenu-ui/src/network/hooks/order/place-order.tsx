import { useMutation } from "@tanstack/react-query";
import {
  placeOrder,
  placeOrderRequest,
  placeOrderResponse,
} from "@/network/api/order/place-order";

export const usePlaceOrder = () => {
  return useMutation<placeOrderResponse, Error, placeOrderRequest>({
    mutationFn: placeOrder,
  });
};
