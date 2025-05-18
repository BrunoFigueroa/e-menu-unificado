
import { useRetrieveMenuDelDiaQuery } from "@/network/hooks/useRetrieveMenuDelDiaQuery";

export const useMenuDelDia = () => {
  const { data, isLoading, isError, error } = useRetrieveMenuDelDiaQuery();

  return {
    menu: data?.menu || null,
    cargando: isLoading,
    huboError: isError,
    mensajeError: error instanceof Error ? error.message : "Error desconocido",
  };
};
