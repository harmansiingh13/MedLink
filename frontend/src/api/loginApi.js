import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ name, email, password }) => {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
      });
      return data;
    },
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      return data;
    },
  });
};
