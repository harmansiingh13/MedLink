import { createContext, useState } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';
import { useLoader } from './LoaderContext';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const { showLoader, hideLoader } = useLoader();
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '',
  );
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { showToast } = useToast();

  const getAllDoctors = async () => {
    try {
      showLoader();
      const { data } = await axios.post(
        backendUrl + '/api/admin/all-doctors',
        {},
        { headers: { aToken } },
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const changeAvailability = async (docId) => {
    try {
      showLoader();
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability',
        { docId },
        { headers: { aToken } },
      );
      if (data.success) {
        showToast(data.message, 'success');
        getAllDoctors();
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
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };
  return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;
