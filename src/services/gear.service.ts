import axiosInstance from '@/lib/axiosInstance';

export const getAllGears = async (filters = {}) => {
  const { data } = await axiosInstance.get('/gear', { params: filters });
  return data.data; 
};

export const getSingleGear = async (id: string) => {
  const { data } = await axiosInstance.get(`/gear/${id}`);
  return data.data;
};

export const getCategories = async () => {
  const { data } = await axiosInstance.get('/categories');
  return data.data;
};