import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_PATHS } from "../constants/ApiPaths";
import axiosInstance from "../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

export const useDoctorAppointments = () =>
  useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        API_PATHS.DOCTOR.GET_APPOINTMENTS
      );
      return data.appointments;
    },
  });

export const useDoctorDashboard = () => {
  return useQuery({
    queryKey: ["doctor-dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.DOCTOR.GET_DASHBOARD);
      if (!data.success) throw new Error(data.message);
      return data.dashData;
    },
  });
};

export const useDoctorProfile = () => {
  return useQuery({
    queryKey: ["doctor-profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.DOCTOR.GET_PROFILE);
      if (!data.success) throw new Error(data.message);
      return data.profileData;
    },
  });
};

export const useCompleteAppointment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.COMPLETE_APPOINTMENT,
        { appointmentId }
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.message, type: "success" }));
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-dashboard"] });
    },
    onError: (err) => {
      dispatch(showToast({ message: err.message, type: "error" }));
    },
  });
};

export const useCancelDoctorAppointment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.CANCEL_APPOINTMENT,
        { appointmentId }
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.message, type: "success" }));
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-dashboard"] });
    },
    onError: (err) => {
      dispatch(showToast({ message: err.message, type: "error" }));
    },
  });
};

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.UPDATE_DOCTOR_PROFILE,
        payload
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.message, type: "success" }));

      queryClient.invalidateQueries({
        queryKey: ["doctor-profile"],
      });
    },
    onError: (err) => {
      dispatch(showToast({ message: err.message, type: "error" }));
    },
  });
};
