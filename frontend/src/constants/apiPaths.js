export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/user/login",
    REGISTER: "/api/user/register",
    UPDATE_PROFILE: "/api/user/update-profile",
    GET_USER: "/api/user/get-profile",
  },
  APPOINTMENT: {
    BOOK_APPOINTMENT: "/api/user/book-appointment",
    GET_USER_APPOINTMENT: "/api/user/appointments",
    CANCEL_APPOINTMENT: "/api/user/cancel-appointment",
    VERIFY_RAZORPAY: "/api/user/verify-razorpay",
    PAY_WITH_RAZORPAY: "/api/user/payment-razorpay",
  },
  DOCTOR: {
    GET_DOCTORS: "/api/doctor/list",
  },
};
