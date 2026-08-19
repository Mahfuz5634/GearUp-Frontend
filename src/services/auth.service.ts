import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User, LoginResponse, RegisterResponse } from "@/types";

export const registerUser = async (userData: Record<string, unknown>): Promise<RegisterResponse> => {
    const {data} = await axiosInstance.post('/auth/register',userData);
    return data;
}

export const loginUser = async (credentials: Record<string, unknown>): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post('/auth/login', credentials);
  if (data?.success) {
    Cookies.set('accessToken', data.data.accessToken, { expires: 30 });
  }
  return data;
};

export const logoutUser =()=>{
  Cookies.remove('accessToken');
}

export const getCurrentUser = (): User | null => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);
        return decodedToken;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
}
