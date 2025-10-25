import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';
import { useLoader } from './LoaderContext';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '',
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      showLoader();

      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
        headers: { dToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        // console.log(data.appointments.reverse());
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      showLoader();

      const { data } = await axios.post(
        backendUrl + '/api/doctor/complete-appointment',
        { appointmentId },
        { headers: { dToken } },
      );

      if (data.success) {
        showToast(data.message, 'success');
        getAppointments();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      showLoader();

      const { data } = await axios.post(
        backendUrl + '/api/doctor/cancel-appointment',
        { appointmentId },
        { headers: { dToken } },
      );

      if (data.success) {
        showToast(data.message, 'success');
        getAppointments();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const getDashData = async () => {
    try {
      showLoader();
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {
        headers: { dToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const getProfileData = async () => {
    try {
      showLoader();

      const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
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
  return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
