import { useState } from "react";
import { createContext } from "react";
import { useToast } from "./ToastContext";
import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const { showToast } = useToast();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      setLoader(true);

      const { data } = await axiosInstance.get(
        API_PATHS.DOCTOR.GET_APPOINTMENTS
      );

      if (data.success) {
        setAppointments(data.appointments);
        // console.log(data.appointments.reverse());
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      setLoader(true);

      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.COMPLETE_APPOINTMENT,
        { appointmentId }
      );

      if (data.success) {
        showToast(data.message, "success");
        getAppointments();
        getDashData();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setLoader(true);

      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.CANCEL_APPOINTMENT,
        {
          appointmentId,
        }
      );

      if (data.success) {
        showToast(data.message, "success");
        getAppointments();
        getDashData();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const getDashData = async () => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.get(API_PATHS.DOCTOR.GET_DASHBOARD);

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const getProfileData = async () => {
    try {
      setLoader(true);

      const { data } = await axiosInstance.get(API_PATHS.DOCTOR.GET_PROFILE);
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
