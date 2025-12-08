import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_PATHS } from "../ApiPaths";
import axiosInstance from "../AxiosInstance";

export const useUserAppointments = (enabled) => {
  return useQuery({
    queryKey: ["user-appointments"],
    enabled, // only fetch if token exists
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
