import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Check, X } from "@/components/icons";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg text-sm overflow-hidden">
        <table className="min-w-full text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
            <tr>
              <th className="py-3 px-6 text-left font-medium">#</th>
              <th className="py-3 px-6 text-left font-medium">Patient</th>
              <th className="py-3 px-6 text-left font-medium">Payment</th>
              <th className="py-3 px-6 text-left font-medium">Age</th>
              <th className="py-3 px-6 text-left font-medium">
                Date &amp; Time
              </th>
              <th className="py-3 px-6 text-left font-medium">Fees</th>
              <th className="py-3 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments
              .slice()
              .reverse()
              .map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <td className="py-3 px-6">{index + 1}</td>

                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <p>{item.userData.name}</p>
                    </div>
                  </td>

                  <td className="py-3 px-6">
                    <span
                      className={`text-xs inline border px-2 py-0.5 rounded-full ${
                        item.payment
                          ? "border-green-500 text-green-600 bg-green-50"
                          : "border-yellow-500 text-yellow-600 bg-yellow-50"
                      }`}
                    >
                      {item.payment ? "ONLINE" : "CASH"}
                    </span>
                  </td>

                  <td className="py-3 px-6">
                    {calculateAge(item.userData.dob)}
                  </td>

                  <td className="py-3 px-6">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </td>

                  <td className="py-3 px-6">
                    {currency}
                    {item.amount}
                  </td>

                  <td className="py-3 px-6 text-center">
                    {item.cancelled ? (
                      <span className="inline-flex items-center justify-center bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex items-center justify-center bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                        Completed
                      </span>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white rounded-full p-1 cursor-pointer transition-all duration-200 shadow-sm"
                          title="Cancel appointment"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full p-1 cursor-pointer transition-all duration-200 shadow-sm"
                          title="Cancel appointment"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
