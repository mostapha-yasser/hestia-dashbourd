import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import handleError from "./errorHandler";
import Cookies from "js-cookie";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}
export const setupInterceptors =  (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(
     (config) => {
      const token =  Cookies.get("session");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ErrorResponse | string>) => {
      handleError(error);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
