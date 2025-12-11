import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.DOCTOR.GET_DOCTORS);
      if (!data.success) throw new Error(data.message);
      return data.doctors;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
