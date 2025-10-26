import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { useLoader } from '../context/LoaderContext';
import Dropdown from '../components/Dropdown';
import { Mail, Upload } from '../icons/Icons';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      showLoader();
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      });

      if (data.success) {
        showToast(data.message, 'success');
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, 'error');
    } finally {
      hideLoader();
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setImage(false);
    loadUserProfileData();
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                {isEdit ? (
                  <label htmlFor="image" className="cursor-pointer block relative">
                    <div className="relative">
                      <img
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt="Profile"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-gray-300 transition-all shadow-sm"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all">
                        <div className="text-white text-center">
                          <Upload className="w-7 h-7 mx-auto mb-1" />
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={userData.image}
                      alt="Profile"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left flex-1">
                {isEdit ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 w-full max-w-md focus:ring-0 focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                    <p className="text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="w-4" />

                      {userData.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                {isEdit ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 focus:ring-0 focus:outline-none"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium py-3">
                    {userData.phone || 'Not provided'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                {isEdit ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 focus:ring-0 focus:outline-none"
                      placeholder="Address line 1"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 focus:ring-0 focus:outline-none"
                      placeholder="Address line 2 "
                    />
                  </div>
                ) : (
                  <div className="text-gray-900 py-3">
                    <p className="font-medium">{userData.address.line1}</p>
                    {userData.address.line2 && (
                      <p className="text-gray-600">{userData.address.line2}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 pr-2">Gender</label>
                {isEdit ? (
                  <Dropdown
                    options={['Male', 'Female']}
                    value={userData.gender}
                    onSelect={(val) => setUserData((p) => ({ ...p, gender: val }))}
                    placeholder="Select Gender"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 focus:ring-0 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium py-3">
                    {userData.gender || 'Not specified'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-2 focus:ring-0 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium py-3">
                    {userData.dob || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100">
            {isEdit ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserProfileData}
                  className="px-5 py-2 bg-primary text-white rounded-lg font-medium shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2 bg-primary text-white rounded-lg font-medium shadow-sm flex items-center gap-2 cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
