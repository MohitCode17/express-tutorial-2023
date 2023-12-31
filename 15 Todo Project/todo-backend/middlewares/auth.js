import jwt from "jsonwebtoken"
import { User } from "../model/user.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(404).json({
            success: false,
            message: "Please login with your account",
        });
    };

    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decodedData._id);

    next();
};