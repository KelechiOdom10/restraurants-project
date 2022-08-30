import { axiosInstance } from "./axios";

export const getAllProducts = () => {
  const response = axiosInstance.get("/api/product");
  return response;
};
