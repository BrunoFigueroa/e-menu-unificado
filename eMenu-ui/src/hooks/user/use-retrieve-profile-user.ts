import { useRetrieveProfileUser } from "@/network/hooks/user/retrieve-profile-user";
import {
  retrieveProfileUserRequest,
  retrieveProfileUserResponse,
} from "@/network/api/user/retrieve-profile-user";

export const useRetrieveProfileUserHook = (
  request: retrieveProfileUserRequest,
  initialData?: retrieveProfileUserResponse
) => {
  const { data, isPending, isFetching, isError, error, refetch } =
    useRetrieveProfileUser(request, initialData);

  return {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};
