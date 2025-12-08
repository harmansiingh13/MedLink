import { useState } from "react";
import { assets } from "../../assets/assets";
import { useToast } from "../../context/ToastContext";
import Dropdown from "../../components/Dropdown";
import { Upload } from "@/components/icons";
import { API_PATHS } from "../../utils/ApiPaths";
import axiosInstance from "../../utils/AxiosInstance";
import { Loader } from "../../components/Loader";

const AddDoctor = () => {
  const [loader, setLoader] = useState(false);
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { showToast } = useToast();
  const experienceOptions = [
    "1 Year",
    "2 Year",
    "3 Year",
    "4 Year",
    "5 Year",
    "6 Year",
    "7 Year",
    "8 Year",
    "9 Year",
    "10 Year",
  ];

  const specialityOptions = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (!docImg) {
        showToast("Image not selected", "error");
        return;
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.ADD_DOCTOR,
        formData
      );

      if (data.success) {
        showToast(data.message, "success");
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setExperience(1);
        setSpeciality("General physician");
        setFees("");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
      console.error("Form submit error:", error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium"> Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-200 rounded-xl shadow-lg w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="relative group cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 h-16 object-cover bg-gray-100 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all">
              <div className="text-white text-center">
                <Upload className="w-6 h-6 mx-auto mb-0.5" />
              </div>
            </div>
          </label>

          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

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
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
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
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
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
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <Dropdown
                options={experienceOptions}
                placeholder="Select Experience"
                className="border border-zinc-200 rounded px-3 py-2 w-40 focus:outline-none focus:ring-0"
                onSelect={(value) => setExperience(value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>

              <Dropdown
                options={specialityOptions}
                placeholder="Select Experience"
                className="border border-zinc-200 rounded px-3 py-2 w-40 focus:outline-none focus:ring-0"
                onSelect={(value) => setSpeciality(value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Eduction</p>
              <input
                type="text"
                placeholder="Eduction"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
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
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-0"
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
            className="w-full px-4 pt-2 border border-zinc-200 rounded focus:outline-none focus:ring-0"
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
