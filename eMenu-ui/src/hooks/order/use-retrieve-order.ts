import { useRetrieveOrder } from "@/network/hooks/order/retrieve-order";
import {
  retrieveOrderRequest,
  retrieveOrderResponse,
} from "@/network/api/order/retrieve-order";

export const useRetrieveOrderHook = (
  request: retrieveOrderRequest,
  initialData?: retrieveOrderResponse
) => {
  const { data, isPending, isFetching, isError, error, refetch } =
    useRetrieveOrder(request, initialData);

  return {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};
