import React from 'react';
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Check, X } from '../../icons/Icons';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointmemnts</p>
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="" className="w-8 rounded-full" />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? 'ONLINE' : 'CASH'}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
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
              <div className="flex gap-2 ml-5">
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
  );
};

export default DoctorAppointments;
