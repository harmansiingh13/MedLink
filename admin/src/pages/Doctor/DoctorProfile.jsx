import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { API_PATHS } from "../../utils/ApiPaths";
import axiosInstance from "../../utils/AxiosInstance";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const { showToast } = useToast();

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axiosInstance.post(
        API_PATHS.DOCTOR.UPDATE_DOCTOR_PROFILE,
        updateData
      );

      if (data.success) {
        showToast(data.message, "success");
        setIsEdit(false);
        getProfileData();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="mb-3 text-lg font-medium">Doctor Profile</p>
            <p className="text-gray-600 mt-2">
              Manage your professional information and availability
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={profileData.image}
                      alt={`Dr. ${profileData.name}`}
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover bg-primary"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      {profileData.name}
                      <span className="text-lg font-normal text-gray-500">
                        •
                      </span>
                      <span className="text-lg font-semibold text-primary">
                        {profileData.speciality}
                      </span>
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-primary font-medium">
                        {profileData.degree}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium border border-gray-200">
                        {profileData.experience} experience
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      About
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.about}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Appointment Fee */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Appointment Fee
                      </label>
                      {isEdit ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">{currency}</span>
                          </div>
                          <input
                            value={profileData.fees}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                fees: e.target.value,
                              }))
                            }
                            type="number"
                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 w-full"
                            placeholder="Enter fee amount"
                          />
                        </div>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">
                          {currency} {profileData.fees}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability Status
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            isEdit &&
                            setProfileData((prev) => ({
                              ...prev,
                              available: !prev.available,
                            }))
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-0 ${
                            profileData.available ? "bg-primary" : "bg-gray-300"
                          } ${
                            isEdit
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                          disabled={!isEdit}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              profileData.available
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>

                        <div
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${
                            profileData.available
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {profileData.available ? "Available" : "Unavailable"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Clinic Address
                    </h3>
                    {isEdit ? (
                      <div className="space-y-3">
                        <input
                          value={profileData.address.line1}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value,
                              },
                            }))
                          }
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                          placeholder="Address Line 1"
                        />
                        <input
                          value={profileData.address.line2}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value,
                              },
                            }))
                          }
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                          placeholder="Address Line 2"
                        />
                      </div>
                    ) : (
                      <div className="text-gray-600 space-y-1">
                        <p>{profileData.address.line1}</p>
                        <p>{profileData.address.line2}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {isEdit ? (
                      <button
                        onClick={updateProfile}
                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary cursor-pointer"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEdit(true)}
                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
