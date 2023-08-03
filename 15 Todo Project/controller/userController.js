import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import jwt from "jsonwebtoken";

// ============ Register user api controller ============
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        success: false,
        message: "User alreay exist",
      });
    }

    // Hassed password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send cookies
    sendCookies(user, res, 201, "User Register Successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// ============ Login user api controller ============
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Send cookie after validation
    sendCookies(user, res, 200, `Welcome back, ${user.name}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// ============ Get user profile api controller ============
export const userProfile = async (req, res) => {
  // const {token} = req.cookies;

  // if(!token) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Please login with your account",
  //   });
  // };

  // const decodeData = jwt.verify(token, process.env.JWT_KEY);

  // const user = await User.findById(decodeData._id);

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// ============ Logout user api controller ============
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User logout Successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
