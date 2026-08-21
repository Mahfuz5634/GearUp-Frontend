import axiosInstance from '@/lib/axiosInstance';

export const getProviderGear = async () => {
  const { data } = await axiosInstance.get('/provider/gear');
  return data.data;
};

export const createProviderGear = async (payload: FormData) => {
  const { data } = await axiosInstance.post('/provider/gear', payload);
  return data.data;
};

export const updateProviderGear = async (id: string, payload: FormData) => {
  const { data } = await axiosInstance.put(`/provider/gear/${id}`, payload);
  return data.data;
};

export const deleteProviderGear = async (id: string) => {
  const { data } = await axiosInstance.delete(`/provider/gear/${id}`);
  return data.data;
};

export const getProviderOrders = async () => {
  const { data } = await axiosInstance.get('/provider/orders');
  return data.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data } = await axiosInstance.patch(`/provider/orders/${orderId}`, { status });
  return data.data;
};
