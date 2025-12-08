export const API_PATHS = {
  ADMIN: {
    LOGIN: "/api/admin/login",
    ADD_DOCTOR: "/api/admin/add-doctor",
    GET_ALL_DOCTORS: "/api/admin/all-doctors",
    CHANGE_AVAILABILITY: "/api/admin/change-availability",
    GET_ALL_APPOINTMENTS: "/api/admin/appointments",
    CANCEL_APPOINTMENT: "/api/admin/cancel-appointment",
    GET_DASHBOARD: "/api/admin/dashboard",
  },
  DOCTOR: {
    LOGIN: "/api/doctor/login",
    GET_PROFILE: "/api/doctor/profile",
    UPDATE_DOCTOR_PROFILE: "/api/doctor/update-profile",
    GET_APPOINTMENTS: "/api/doctor/appointments",
    COMPLETE_APPOINTMENT: "/api/doctor/complete-appointment",
    CANCEL_APPOINTMENT: "/api/doctor/cancel-appointment",
    GET_DASHBOARD: "/api/doctor/dashboard",
  },
};
