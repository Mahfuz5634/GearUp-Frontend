import axiosInstance from '@/lib/axiosInstance';

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get('/admin/users');
  return data.data;
};

export const updateUserStatus = async (id: string, payload: { status: string; role?: string }) => {
  const { data } = await axiosInstance.patch(`/admin/users/${id}`, payload);
  return data.data;
};

export const getAllRentals = async () => {
  const { data } = await axiosInstance.get('/admin/rentals');
  return data.data;
};

export const getAllGearsAdmin = async () => {
  const { data } = await axiosInstance.get('/admin/gear');
  return data.data;
};
