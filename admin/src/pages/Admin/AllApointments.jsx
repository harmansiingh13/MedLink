import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Trash, X } from '../../icons/Icons';

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">App Appointments</p>
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-zinc-200">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-zinc-200 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="" className="w-8 h-8 object-cover rounded-full" />
              <p>{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img src={item.docData.image} alt="" className="w-8 rounded-full bg-gray-200" />
              <p>{item.docData.name}</p>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>
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
                className="w-8 text-white bg-red-500 rounded-full p-1.5 cursor-pointer ml-5 stroke-3"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
