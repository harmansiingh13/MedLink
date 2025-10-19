import { createContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';
import { useState } from 'react';
import { useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { showToast } = useToast();
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : false,
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.log(error.message);
      showToast(error.message, 'error');
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        showToast('data.message', 'error');
      }
    } catch (error) {
      console.log(error.message);
      showToast(error.message, 'error');
    }
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
