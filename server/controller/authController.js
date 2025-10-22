import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields require" });
  }

  try {
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to MERN-Auth",
        text: `Welcome to MERN-Auth website. Your account hasbeen creates with email id: ${email}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: "Email sent failed", error });
    }

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, message: "Successfully logout" });
};

//OTP verfication controller
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userID } = req.body;

    const user = await userModel.findById(userID);

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Your account already verified",
      });
    }

    //verify the account
    //generate otp
    const otp = String(Math.floor(Math.random() * 900000 + 100000));

    user.verifyOTP = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    //send otp via email
    //1. prepare the email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification",
      text: `This is your OTP ${otp}, Please verify your accpunt`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Otp email successfully sent" });
  } catch (error) {
    console.error("Error in VeriftOTp controller", error.message);
    return res.json({ success: false, message: "VerifyOtp error" });
  }
};

//Email verify conroller
export const verifyEmail = async (req, res) => {
  const { userID, otp } = req.body;

  if (!userID || !otp) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findById(userID);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email Successfully Verified" });
  } catch (error) {
    console.error("Error in VeriftOTp controller", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const isAuthenticate = (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
