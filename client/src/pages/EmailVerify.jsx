import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { getUserData, backendUrl, isLoggedin, userData } =
    useContext(AppContext);

  const inputRef = useRef([]);

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map((el) => el.value);
      console.log(otpArray);
      const otp = otpArray.join("");
      console.log(otp);

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);
  return (
    <div
      onPaste={handlePaste}
      className="flex justify-center items-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-sky-100 to- bg-cyan-500"
    >
      <img
        src={assets.logo}
        alt=""
        className="w-28 sm:w-32 absolute top-4 left-8 cursor-pointer"
        onClick={() => {
          getUserData();
          navigate("/");
        }}
      />
      <form
        onSubmit={onSubmitHandler}
        className="w-96  bg-white px-4 py-4 text-center rounded"
      >
        <h1 className="font-medium text-xl mb-2"> Email Verify OTP</h1>
        <p className="text-sm mb-6">
          Enter the 6-Digit code sent to your Email
        </p>
        <div className="flex gap-1 justify-between mb-6">
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
    </div>
  );
};

export default EmailVerify;
