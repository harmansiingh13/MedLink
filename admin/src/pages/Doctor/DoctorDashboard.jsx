import { assets } from "../../assets/assets";
import { Briefcase, Check, X } from "@/components/icons";
import {
  useCancelDoctorAppointment,
  useCompleteAppointment,
  useDoctorDashboard,
} from "../../api/doctorApi";
import { Loader } from "../../components/Loader";
import { slotDateFormat } from "../../constants/date";
import { useSelector } from "react-redux";

const DoctorDashboard = () => {
  const currency = useSelector((state) => state.app.currencySymbol);
  const { data: dashData, isLoading } = useDoctorDashboard();
  const completeAppointmentMutation = useCompleteAppointment();
  const cancelAppointmentMutation = useCancelDoctorAppointment();

  if (
    isLoading ||
    completeAppointmentMutation.isPending ||
    cancelAppointmentMutation.isPending
  )
    return <Loader />;

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
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-gray-200 shadow-lg cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden mt-10">
          <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-white">
            <Briefcase className="w-7 text-primary" />
            <p className="font-semibold text-gray-800">Latest Bookings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-600">
              <tbody className="divide-y divide-gray-100">
                {dashData.latestAppointments.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.userData.image}
                          alt={item.userData.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <p className="font-medium text-gray-800">
                          {item.userData.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {slotDateFormat(item.slotDate)}
                    </td>

                    <td className="px-6 py-4 text-center">
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
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                cancelAppointmentMutation.mutate(item._id)
                              }
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white rounded-full p-1 cursor-pointer transition-all duration-200 shadow-sm"
                              title="Cancel appointment"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                completeAppointmentMutation.mutate(item._id)
                              }
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full p-1 cursor-pointer transition-all duration-200 shadow-sm"
                              title="Cancel appointment"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
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

export default DoctorDashboard;
