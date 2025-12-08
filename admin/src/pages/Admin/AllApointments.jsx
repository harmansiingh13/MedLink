import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { X } from "@/components/icons";

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">App Appointments</p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg text-sm min-h-[60vh] overflow-hidden">
        <table className="min-w-full text-gray-600">
          <thead className="bg-gray-50 border-b border-zinc-200 text-gray-500 uppercase text-xs">
            <tr>
              <th className="py-3 px-6 text-left font-medium">#</th>
              <th className="py-3 px-6 text-left font-medium">Patient</th>
              <th className="py-3 px-6 text-left font-medium">Age</th>
              <th className="py-3 px-6 text-left font-medium">
                Date &amp; Time
              </th>
              <th className="py-3 px-6 text-left font-medium">Doctor</th>
              <th className="py-3 px-6 text-left font-medium">Fees</th>
              <th className="py-3 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border-b border-zinc-200 transition-colors"
              >
                <td className="py-3 px-6">{index + 1}</td>

                <td className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{item.userData.name}</p>
                  </div>
                </td>

                <td className="py-3 px-6">{calculateAge(item.userData.dob)}</td>

                <td className="py-3 px-6">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </td>

                <td className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <p>{item.docData.name}</p>
                  </div>
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
  );
};

export default AllApointments;
