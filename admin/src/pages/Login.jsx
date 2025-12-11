import { useState } from "react";
import { Briefcase, ShieldUser } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { setAdminToken, setDoctorToken } from "../store/appSlice";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";
import { useLogin } from "../api/loginApi";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        role: state,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (state === "Admin") {
            dispatch(setAdminToken(data.token));
            navigate("/admin-dashboard");
            dispatch(
              showToast({ message: "Admin login successful", type: "success" })
            );
          } else {
            dispatch(setDoctorToken(data.token));
            navigate("/doctor-dashboard");
            dispatch(
              showToast({ message: "Doctor login successful", type: "success" })
            );
          }
        },

        onError: (err) => {
          dispatch(showToast({ message: err.message, type: "error" }));
        },
      }
    );
  };

  const switchMode = (newMode) => {
    setState(newMode);
    setEmail("");
    setPassword("");
  };

  if (loginMutation.isPending) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {state} Portal
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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

          <form onSubmit={onSubmitHandler} className="p-8">
            <div className="space-y-6">
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
