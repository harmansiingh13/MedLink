import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/AxiosInstance";
import { API_PATHS } from "../constants/ApiPaths";

export const useUserAppointments = (enabled) => {
  return useQuery({
    queryKey: ["user-appointments"],
    enabled, 
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        API_PATHS.APPOINTMENT.GET_USER_APPOINTMENT
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch appointments");
      }

      return data.appointments.reverse();
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const { data } = await axiosInstance.post(
        API_PATHS.APPOINTMENT.CANCEL_APPOINTMENT,
        { appointmentId }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to cancel appointment");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-appointments"] });
    },
  });
};
