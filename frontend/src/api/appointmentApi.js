import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: async ({ docId, slotDate, slotTime }) => {
      const { data } = await axiosInstance.post(
        API_PATHS.APPOINTMENT.BOOK_APPOINTMENT,
        { docId, slotDate, slotTime }
      );
      return data;
    },
  });
};
