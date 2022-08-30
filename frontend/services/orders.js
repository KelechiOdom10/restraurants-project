import { axiosInstance } from "./axios";

export const getMyOrders = async () => {
  const { data } = await axiosInstance.get("/api/order/myorders");
  return data;
};

export const getAllOrders = () => {
  const response = axiosInstance.get("/api/order");
  return response;
};

export const createOrder = payload => {
  const response = axiosInstance.post(`/api/order`, { ...payload });
  return response;
};
