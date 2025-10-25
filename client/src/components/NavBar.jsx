import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  const { setIsLoggedin, userData, setUserData, backendUrl } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-24 sm:w-32" />

      {userData ? (
        <div className="w-10 h-10 flex items-center justify-center rounded-full p-6 relative bg-blue-700 text-white group cursor-pointer">
          {userData.name[0].toUpperCase()}
          <div className="absolute w-30 hidden group-hover:block text-black top-0 right-0 z-10 rounded pt-13">
            <ul className="list-none p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  className="hover:bg-gray-200 px-2 py-1 "
                  onClick={sendVerificationOtp}
                >
                  Verify Email
                </li>
              )}
              <li className="hover:bg-gray-200 px-2 py-1" onClick={logOut}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
