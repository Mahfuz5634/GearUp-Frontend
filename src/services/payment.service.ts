import axiosInstance from '@/lib/axiosInstance';

export const createPaymentIntent = async (rentalOrderId: string) => {
  const { data } = await axiosInstance.post('/payments/create', { rentalOrderId });
  return data.data; 
};

export const confirmPayment = async (transactionId: string) => {
  const { data } = await axiosInstance.post('/payments/confirm', { transactionId });
  return data;
};

export const getMyPayments = async () => {
  const { data } = await axiosInstance.get('/payments');
  return data.data;
};