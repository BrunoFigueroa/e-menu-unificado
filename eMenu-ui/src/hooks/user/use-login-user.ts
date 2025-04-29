import { useLoginUser } from "@/network/hooks/user/login-user";

export const useLoginUserHook = () => {
  const { isPending, data, mutate, status } = useLoginUser();

  return {
    isPending,
    data,
    mutate,
    status,
  };
};
