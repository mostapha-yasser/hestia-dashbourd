import axiosInstance from "@/lib/axios/instance";
import { User } from "@/types/user";

const userUrl = "user";

const getUserDetails = async (userId: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`${userUrl}/${userId}`);
  return response.data; 
};
export {
  getUserDetails,
  
};
