import { useSelectDayPlato } from "@/network/hooks/plato/select-day-plato";

export const useSelectDayPlatoHook = () => {
  const { isPending, data, mutate, status } = useSelectDayPlato();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
