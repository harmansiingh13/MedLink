import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ role, email, password }) => {
      const endpoint =
        role === "Admin" ? API_PATHS.ADMIN.LOGIN : API_PATHS.DOCTOR.LOGIN;

      const { data } = await axiosInstance.post(endpoint, {
        email,
        password,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
  });
};
