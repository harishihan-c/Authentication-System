import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-sky-100 to- bg-cyan-500">
      <img
        src={assets.logo}
        alt=""
        className="w-28 sm:w-32 absolute top-4 left-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-col w-md sm:w-96 p-6  rounded-2xl text-center bg-white">
        <h1 className="text-2xl font-medium mb-7 text-gray-900">
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </h1>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex gap-4 w-full bg-gray-100 px-8 py-2 rounded-full mb-4">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="outline-none bg-transparent placeholder-gray-400 font-light"
                required
              />
            </div>
          )}

          <div className="flex gap-4 w-full bg-gray-100 px-8 py-2 rounded-full mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full outline-none bg-transparent placeholder-gray-400 font-light"
              required
            />
          </div>
          <div className="flex gap-4 w-full bg-gray-100 px-8 py-2 rounded-full mb-3">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent placeholder-gray-400 font-light"
              required
            />
          </div>
        
        {state !== "Sign Up" && <p
            className="text-sm text-gray-500 text-left mb-3 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forget Password?
          </p> }

          <button className="cursor-pointer border bg-blue-800 w-full  px-9 py-2 rounded-full mt-3 text-white mb-4">
            {state}
          </button>

          {state === "Sign Up" ? (
            <p className="text-sm text-gray-500 ">
              Already have an account ?{" "}
              <span
                onClick={() => setState("Log In")}
                className="text-gray-950 cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 ">
              Dont have an account ?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-gray-950 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
