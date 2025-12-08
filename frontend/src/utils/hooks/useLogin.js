import { API_PATHS } from "../ApiPaths";
import axiosInstance from "../AxiosInstance";
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
