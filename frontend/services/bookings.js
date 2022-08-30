import { axiosInstance } from "./axios";

export const getMyBookings = async () => {
  const { data } = await axiosInstance.get("/api/booking/mybookings");
  return data;
};

export const getAllBookings = () => {
  const response = axiosInstance.get("/api/booking");
  return response;
};

export const createBooking = payload => {
  const response = axiosInstance.post(`/api/booking`, { ...payload });
  return response;
};
export const updateBooking = (id, payload) => {
  const response = axiosInstance.post(`/api/booking/${id}`, { ...payload });
  return response;
};
