import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  registerUserRequest,
  registerUserResponse,
} from "@/network/api/user/register-user";

export const useRegisterUser = () => {
  return useMutation<registerUserResponse, Error, registerUserRequest>({
    mutationFn: registerUser,
  });
};
