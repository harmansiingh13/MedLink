import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { useLoader } from '../context/LoaderContext';
import Dropdown from '../components/Dropdown';

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

  return (
    userData && (
      <div className="max-w-3xl mx-auto px-6 py-8 text-gray-800">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer block relative">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                  <img src={assets.upload_icon} alt="Upload" className="w-8" />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
            )}
          </div>

          <div className="text-center sm:text-left">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                className="text-3xl font-semibold border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out"
              />
            ) : (
              <h2 className="text-3xl font-semibold">{userData.name}</h2>
            )}
            <p className="text-gray-500 mt-1">{userData.email}</p>
          </div>
        </div>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-1">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-y-3 mt-3 text-sm">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="number"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            ) : (
              <p className="text-blue-600">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-primary focus:outline-none"
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
                  className="border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </section>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-1">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-y-3 mt-3 text-sm">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <Dropdown
                options={['Male', 'Female']}
                value={userData.gender}
                onSelect={(val) => setUserData((p) => ({ ...p, gender: val }))}
                placeholder="Select Gender"
                className="w-[120px] h-[36px] px-3 border border-gray-300 rounded-md bg-white"
              />
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-primary focus:outline-none w-[160px]"
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border border-primary text-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary text-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
