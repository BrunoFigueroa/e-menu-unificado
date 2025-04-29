import { useQuery } from "@tanstack/react-query";
import {
  retrieveProfileUser,
  retrieveProfileUserRequest,
  retrieveProfileUserResponse,
} from "@/network/api/user/retrieve-profile-user";

export const useRetrieveProfileUser = (
  request: retrieveProfileUserRequest,
  initialData?: retrieveProfileUserResponse
) => {
  return useQuery({
    queryKey: ["profile", request.id],
    queryFn: () => retrieveProfileUser(request),
    initialData,
    enabled: !!request.id,
  });
};
