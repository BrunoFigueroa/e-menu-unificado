import { useSearchPlato } from "@/network/hooks/plato/search-plato";
import {
  searchPlatoRequest,
  searchPlatoResponse,
} from "@/network/api/plato/search-plato";

export const useSearchPlatoHook = (
  request: searchPlatoRequest,
  initialData?: searchPlatoResponse
) => {
  const { data, isPending, isFetching, isError, error, refetch } =
    useSearchPlato(request, initialData);

  return {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};
