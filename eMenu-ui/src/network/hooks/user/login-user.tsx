import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  loginUserRequest,
  loginUserResponse,
} from "@/network/api/user/login-user";

export const useLoginUser = () => {
  return useMutation<loginUserResponse, Error, loginUserRequest>({
    mutationFn: loginUser,
  });
};
