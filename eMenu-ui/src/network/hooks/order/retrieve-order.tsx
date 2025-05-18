import { useQuery } from "@tanstack/react-query";
import {
  retrieveOrder,
  retrieveOrderRequest,
  retrieveOrderResponse,
} from "@/network/api/order/retrieve-order";

export const useRetrieveOrder = (
  request: retrieveOrderRequest,
  initialData?: retrieveOrderResponse
) => {
  return useQuery({
    queryKey: ["order", request.orderID],
    queryFn: () => retrieveOrder(request),
    initialData,
    enabled: !!request.orderID,
  });
};
