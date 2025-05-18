
import { useQuery } from "@tanstack/react-query";
import { retrieveMenuDelDia } from "../api/menu/retrieve-menu-del-dia";

export const useRetrieveMenuDelDiaQuery = () => {
  return useQuery({
    queryKey: ["menu-del-dia"],
    queryFn: retrieveMenuDelDia,
  });
};
