import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { API_PATHS } from "../constants/ApiPaths";
import axiosInstance from "../services/AxiosInstance";
import { showToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

export const useDoctors = () =>
  useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.GET_ALL_DOCTORS
      );
      if (!data.success) throw new Error(data.message);
      return data.doctors;
    },
  });

export const useAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        API_PATHS.ADMIN.GET_ALL_APPOINTMENTS
      );
      if (!data.success) throw new Error(data.message);
      return data.appointments;
    },
  });

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_DASHBOARD);
      if (!data.success) throw new Error(data.message);
      return data.dashData;
    },
  });
};

export const useChangeAvailability = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (docId) => {
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.CHANGE_AVAILABILITY,
        { docId }
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.message, type: "success" }));
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (err) => showToast(err.message, "error"),
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.CANCEL_APPOINTMENT,
        { appointmentId }
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.message, type: "success" }));
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => showToast(err.message, "error"),
  });
};

export const useAddDoctor = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.ADD_DOCTOR,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
  });
};
