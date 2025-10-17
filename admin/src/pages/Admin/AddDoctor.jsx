import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);
  const { showToast } = useToast();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        showToast('Image not selected', 'error');
        return;
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken },
      });

      if (data.success) {
        showToast(data.message, 'success');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.error('Form submit error:', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium"> Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-zinc-100 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                name=""
                id=""
                className="border border-zinc-200 rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                name=""
                id=""
                className="border border-zinc-200 rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Eduction</p>
              <input
                type="text"
                placeholder="Eduction"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-2 border border-zinc-200 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
