import { useMutation } from "@tanstack/react-query";
import {
  selectDayPlato,
  selectDayPlatoRequest,
  selectDayPlatoResponse,
} from "@/network/api/plato/select-day-plato";

export const useSelectDayPlato = () => {
  return useMutation<selectDayPlatoResponse, Error, selectDayPlatoRequest>({
    mutationFn: selectDayPlato,
  });
};
