import { useMutation } from "@tanstack/react-query";
import { API_PATHS } from "../ApiPaths";
import axiosInstance from "../AxiosInstance";

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
