import { useRegisterUser } from "@/network/hooks/user/register-user";

export const useRegisterUserHook = () => {
  const { isPending, data, mutate, status } = useRegisterUser();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
