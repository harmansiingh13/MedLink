import React from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Check, X } from '../../icons/Icons';

const DoctorDashboard = () => {
  const { getDashData, setDashData, dashData, dToken, cancelAppointment, completeAppointment } =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-all">
            <img src={assets.earning_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointments_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden mt-10">
          <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-white">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-3 hover:bg-gray-100 transition-colors"
              >
                <img src={item.userData.image} alt="" className="rounded-full w-10" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {/* {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-10 cursor-pointer"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt=""
                      className="w-10 cursor-pointer"
                    />
                  </div>
                )} */}

                {item.cancelled ? (
                  <span className="flex items-center justify-center bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="flex items-center justify-center bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <X
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 text-white bg-red-500 rounded-full p-1.5 cursor-pointer stroke-3"
                    />

                    <Check
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 text-white bg-green-500 rounded-full p-1.5 cursor-pointer stroke-3"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
