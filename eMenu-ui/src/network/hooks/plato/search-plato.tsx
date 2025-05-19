import { useQuery } from "@tanstack/react-query";
import {
  searchPlato,
  searchPlatoRequest,
  searchPlatoResponse,
} from "@/network/api/plato/search-plato";

export const useSearchPlato = (
  request: searchPlatoRequest,
  initialData?: searchPlatoResponse
) => {
  return useQuery({
    queryKey: ["platos"],
    queryFn: () => searchPlato(request),
    initialData,
    enabled: true,
  });
};
