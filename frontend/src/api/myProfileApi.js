import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );
      return data;
    },
  });
};

export const useUserProfile = (enabled) => {
  return useQuery({
    queryKey: ["user-profile"],
    enabled,
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
      if (!data.success) throw new Error(data.message);
      return data.userData;
    },
  });
};
