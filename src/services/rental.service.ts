
import axiosInstance from '@/lib/axiosInstance';


export const createRentalOrder = async (payload: { gearId: string; startDate: string; endDate: string }) => {
  const { data } = await axiosInstance.post('/rentals', payload);
  return data;
};


export const getMyRentals = async () => {
  const { data } = await axiosInstance.get('/rentals');
  return data.data;
};