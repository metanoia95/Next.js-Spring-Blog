import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserInfo, UserInfo } from "@/lib/services/userService";

export function useUser():UseQueryResult<UserInfo, Error> {
    return useQuery<UserInfo, Error>({
        queryKey:['userInfo'],
        queryFn: getUserInfo,
        retry: false,                 
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

 }