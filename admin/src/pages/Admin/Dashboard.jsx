import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Briefcase, CircleX, Trash, X } from '../../icons/Icons';

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
            {/* <img src={assets.list_icon} alt="" /> */}
            <Briefcase className="w-7 text-primary" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-3 hover:bg-gray-100 transition-colors"
              >
                <img src={item.docData.image} alt="" className="rounded-full w-10" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <span className="flex items-center justify-center bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="flex items-center justify-center bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <X
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 text-white bg-red-500 rounded-full p-1.5 cursor-pointer mr-5 stroke-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
