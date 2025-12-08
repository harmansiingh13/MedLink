import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { Menu, X } from "@/components/icons";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../store/toastSlice";
import { setToken } from "../store/appSlice";
import { useUserProfile } from "../utils/hooks/useMyProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const token = useSelector((state) => state.app.token);
  const { data: userData } = useUserProfile(!!token);

  const logout = () => {
    dispatch(setToken(false));
    localStorage.removeItem("token");
    navigate("/");
    dispatch(showToast({ message: "Logout successfully", type: "success" }));
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-30 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <UserDropdown
            avatarSrc={userData.image}
            options={[
              { label: "My Profile", path: "/my-profile" },
              { label: "My Appointments", path: "/my-appointments" },
              { label: "Logout", onClick: logout },
            ]}
          />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        <Menu onClick={() => setShowMenu(true)} className="w-6 h-6 md:hidden" />

        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />

            <X className="w-7 h-7" onClick={() => setShowMenu(false)} />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              <p className="px-4 py-2 rounded inline-block"> ALL DOCTORS</p>
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
