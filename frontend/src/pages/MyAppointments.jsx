import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPinned } from '../icons/Icons';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      showLoader();
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      showLoader();
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        {
          appointmentId,
        },
        { headers: { token } },
      );

      if (data.success) {
        showToast(data.message, 'success');
        getUserAppointments();
        getDoctorsData();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);

        try {
          showLoader();
          const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', res, {
            headers: { token },
          });

          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments');
          }
        } catch (error) {
          console.log(error);
          showToast(error.message, 'error');
        } finally {
          hideLoader();
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      showLoader();
      console.log('appointmentRazorpay() called with:', appointmentId);
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        console.log(data.order);
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              Total Appointments: <span className="text-indigo-600">{appointments.length}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg border border-gray-300">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
            <p className="text-gray-500 max-w-sm mx-auto">You don't have any appointments yet.</p>
          </div>
        ) : (
          appointments.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image and Basic Info */}
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        className="w-20 h-20 rounded-lg object-cover bg-indigo-50 border border-gray-200"
                        src={item.docData.image}
                        alt={`Dr. ${item.docData.name}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                            {item.docData.name}
                          </h3>
                          <p className="text-sm text-indigo-600 font-medium mt-1">
                            {item.docData.speciality}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <MapPinned className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">Address</p>
                              <p className="text-gray-600">{item.docData.address.line1}</p>
                              {item.docData.address.line2 && (
                                <p className="text-gray-600">{item.docData.address.line2}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700">Date & Time</p>
                              <p className="text-gray-600">
                                {slotDateFormat(item.slotDate)} at {item.slotTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-48">
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <button
                        disabled
                        className="w-full px-4 py-2.5 border border-blue-300 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Paid
                      </button>
                    )}

                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Pay Online
                      </button>
                    )}

                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}

                    {item.cancelled && !item.isCompleted && (
                      <button
                        disabled
                        className="w-full px-4 py-2.5 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Cancelled
                      </button>
                    )}

                    {item.isCompleted && (
                      <button
                        disabled
                        className="w-full px-4 py-2.5 border border-green-200 bg-green-50 text-green-700 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
