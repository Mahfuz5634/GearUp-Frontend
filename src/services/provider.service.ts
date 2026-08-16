/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/lib/axiosInstance';

export const getProviderGear = async () => {
  const { data } = await axiosInstance.get('/provider/gear');
  return data.data;
};

export const createProviderGear = async (payload: any) => {
  const { data } = await axiosInstance.post('/provider/gear', payload);
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
