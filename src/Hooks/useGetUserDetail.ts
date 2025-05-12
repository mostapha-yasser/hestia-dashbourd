import { getUserDetails } from "@/service/apiRequest/userDataApiRequest.";
import { User } from "@/types/user";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useGetUserDetails = (userId: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userId,
    retry: 2
  });
};

export default useGetUserDetails;
