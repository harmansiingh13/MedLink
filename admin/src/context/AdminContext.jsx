import { createContext, useState } from "react";
import { useToast } from "./ToastContext";
import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";
import { Loader } from "../components/Loader";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { showToast } = useToast();

  const getAllDoctors = async () => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.GET_ALL_DOCTORS
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.CHANGE_AVAILABILITY,
        {
          docId,
        }
      );
      if (data.success) {
        showToast(data.message, "success");
        getAllDoctors();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoader(false);
    }
  };

  const getAllAppointments = async () => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.get(
        API_PATHS.ADMIN.GET_ALL_APPOINTMENTS
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
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
        API_PATHS.ADMIN.CANCEL_APPOINTMENT,
        { appointmentId }
      );
      if (data.success) {
        showToast(data.message, "success");
        getAllAppointments();
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

      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_DASHBOARD);

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

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children} {loader && <Loader />}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
