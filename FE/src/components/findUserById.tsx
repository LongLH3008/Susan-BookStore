import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/auth.service";

export const useFindUserById = (userId?: string) => {
  const {
    data: Users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });

  const user = Array.isArray(Users?.metadata?.allUsers)
    ? Users.metadata.allUsers.find((user: IUser) => user._id === userId) || null
    : null;

  return {
    user,
    isLoading,
    isError,
    error,
  };
};
