import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { showToast } from "../store/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/appSlice";
import { useRegister, useSignin } from "../api/loginApi";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.token);
  const registerMutation = useRegister();
  const signinMutation = useSignin();

  const loader = registerMutation.isPending || signinMutation.isPending;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      registerMutation.mutate(
        { name, email, password },
        {
          onSuccess: (data) => {
            if (data.success) {
              localStorage.setItem("token", data.token);
              dispatch(setToken(data.token));
              dispatch(
                showToast({
                  message: "Account created successfully",
                  type: "success",
                })
              );
              navigate("/");
            } else {
              dispatch(showToast({ message: data.message, type: "error" }));
            }
          },
          onError: (err) => {
            dispatch(showToast({ message: err.message, type: "error" }));
          },
        }
      );
    } else {
      signinMutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            if (data.success) {
              localStorage.setItem("token", data.token);
              dispatch(setToken(data.token));
              dispatch(
                showToast({ message: "Login successful", type: "success" })
              );
              navigate("/");
            } else {
              dispatch(showToast({ message: data.message, type: "error" }));
            }
          },
          onError: (err) => {
            dispatch(showToast({ message: err.message, type: "error" }));
          },
        }
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  if (loader) return <Loader />;

  return (
    <div className="py-10 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {state === "Sign Up" ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {state === "Sign Up"
              ? "Please fill in your details to create an account"
              : "Sign in to your account to continue"}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-100">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state === "Sign Up" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-0"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    state === "Sign Up" ? "new-password" : "current-password"
                  }
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-0"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary cursor-pointer"
              >
                {state === "Sign Up" ? "Create Account" : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {state === "Sign Up"
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setState(state === "Sign Up" ? "Login" : "Sign Up");
                    setName("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="font-medium text-primary underline cursor-pointer"
                >
                  {state === "Sign Up" ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
