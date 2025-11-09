import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { DoctorContext } from '../context/DoctorContext';
import { LogOut } from '@/components/icons';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    showToast('Logout Successfully', 'success');
  };

  const userRole = aToken ? 'Admin' : 'Doctor';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center ">
          <img src={assets.admin_logo} alt="Admin Logo" className="w-30 sm:w-36 cursor-pointer" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-blue-100 text-blue-800 border border-blue-200">
              {userRole}
            </span>
          </div>

          <div className="w-px h-9 bg-gray-300 hidden sm:block"></div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
