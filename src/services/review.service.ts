import axiosInstance from '@/lib/axiosInstance';

export const createReview = async (payload: { gearId: string; rating: number; comment: string }) => {
  const { data } = await axiosInstance.post('/reviews', payload);
  return data.data;
};
