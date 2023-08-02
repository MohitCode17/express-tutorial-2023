import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
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

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User registered successfully",
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        error,
    })
  }
};
