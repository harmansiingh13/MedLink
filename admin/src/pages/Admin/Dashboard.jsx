import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Briefcase, X } from '@/components/icons';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <img src={assets.doctor_icon} alt="Doctors" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <img src={assets.appointments_icon} alt="Appointments" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <img src={assets.patients_icon} alt="Patients" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden mt-10">
          <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-white">
            <Briefcase className="w-7 text-primary" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <tbody>
                {dashData.latestAppointments.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={item.docData.image}
                        alt={item.docData.name}
                        className="rounded-full w-10 h-10"
                      />
                      <span className="font-medium text-gray-800">{item.docData.name}</span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{slotDateFormat(item.slotDate)}</td>

                    <td className="px-6 py-4 text-center">
                      {item.cancelled ? (
                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white rounded-full p-1 cursor-pointer transition-all duration-200 shadow-sm"
                          title="Cancel appointment"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
