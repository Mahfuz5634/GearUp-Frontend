import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";



export const registerUser = async(userData:any)=>{
    const {data} = await axiosInstance.post('auth/register',userData);
    return data;
}

export const loginUser = async (credentials: any) => {
  const { data } = await axiosInstance.post('/auth/login', credentials);
  if (data?.success) {
    Cookies.set('accessToken', data.data.accessToken, { expires: 30 });
  }
  return data;
};

export const logoutUser =()=>{
  Cookies.remove('accessToken');
}

export const getCurrentUser = () => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
}
