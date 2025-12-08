import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useToast } from "../context/ToastContext";
import { DoctorContext } from "../context/DoctorContext";
import { Briefcase, ShieldUser } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";
import { Loader } from "../components/Loader";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("clicked!");
    try {
      setLoader(true);
      if (state === "Admin") {
        const { data } = await axiosInstance.post(API_PATHS.ADMIN.LOGIN, {
          email,
          password,
        });
        if (data.success) {
          navigate("/admin-dashboard");
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          showToast("Admin login successful", "success");
        } else {
          showToast(data.message, "error");
        }
      } else {
        const { data } = await axiosInstance.post(API_PATHS.DOCTOR.LOGIN, {
          email,
          password,
        });
        if (data.success) {
          navigate("/doctor-dashboard");
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          showToast("Doctor login successful", "success");
        } else {
          showToast(data.message, "error");
        }
      }
    } catch (error) {
      showToast(error.message, "error");
      console.error("Form submit error:", error);
    } finally {
      setLoader(false);
    }
  };

  const switchMode = (newMode) => {
    setState(newMode);
    setEmail("");
    setPassword("");
  };

  if (loader) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {state} Portal
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Mode Toggle */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => switchMode("Admin")}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 cursor-pointer ${
                state === "Admin"
                  ? "bg-blue-50 text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldUser className="w-5 h-5" />
                Admin Login
              </div>
            </button>
            <button
              onClick={() => switchMode("Doctor")}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 cursor-pointer ${
                state === "Doctor"
                  ? "bg-blue-50 text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5" />
                Doctor Login
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
                  placeholder={`Enter your ${state.toLowerCase()} email`}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium cursor-pointer "
              >
                {`Sign in as ${state}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
