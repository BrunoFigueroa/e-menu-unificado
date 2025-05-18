import { usePlaceOrder } from "@/network/hooks/order/place-order";

export const usePlaceOrderHook = () => {
  const { isPending, data, mutate, status } = usePlaceOrder();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
