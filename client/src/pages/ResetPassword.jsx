import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const inputRef = useRef([]);
  const { getUserData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    console.log(e);
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    console.log(otp);
    setIsOtpSubmited(true);
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-sky-100 to- bg-cyan-500">
      <img
        src={assets.logo}
        alt=""
        className="w-28 sm:w-32 absolute top-4 left-8 cursor-pointer"
        onClick={() => {
          getUserData();
          navigate("/");
        }}
      />
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="w-96  bg-white px-4 py-4 text-center rounded flex flex-col items-center"
        >
          <h1 className="font-medium text-xl mb-2"> Reset Password</h1>
          <p className="text-sm mb-6">Enter your Email to Reset password</p>
          <div className="flex gap-4 w-full bg-gray-100 px-8 py-2 rounded-full mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full outline-none bg-transparent placeholder-gray-400 font-light"
              required
            />
          </div>

          <button className="cursor-pointer border bg-blue-800 w-full  px-9 py-2 rounded-full mt-3 text-white mb-4">
            Submit
          </button>
        </form>
      )}

      {/* OTP*/}

      {!isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="w-96  bg-white px-4 py-4 text-center rounded"
        >
          <h1 className="font-medium text-xl mb-2">
            {" "}
            Reset Password Verify OTP
          </h1>
          <p className="text-sm mb-6">
            Enter the 6-Digit code sent to your Email
          </p>
          <div
            onPaste={handlePaste}
            className="flex gap-1 justify-between mb-6"
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  maxLength={1}
                  key={index}
                  type="text"
                  className="w-12 h-12 bg-gray-300 text-gray-800 text-xl text-center rounded-md outline-gray-500"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="border w-35 py-1 rounded-full bg-blue-800 text-white cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {/* new Password */}

      {isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitPassword}
          className="w-96  bg-white px-4 py-4 text-center rounded flex flex-col items-center"
        >
          <h1 className="font-medium text-xl mb-2"> New Password</h1>
          <p className="text-sm mb-6">Enter your New Password</p>
          <div className="flex gap-4 w-full bg-gray-100 px-8 py-2 rounded-full mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="w-full outline-none bg-transparent placeholder-gray-400 font-light"
              required
            />
          </div>

          <button className="cursor-pointer border bg-blue-800 w-full  px-9 py-2 rounded-full mt-3 text-white mb-4">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
