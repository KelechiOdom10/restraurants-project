import axios from "axios";

axios.defaults.withCredentials = true;

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL_PROD
    : process.env.NEXT_PUBLIC_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});
