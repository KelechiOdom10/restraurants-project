import { axiosInstance } from "./axios";

export const getAllCategories = () => {
  const response = axiosInstance.get("/api/category");
  return response;
};
