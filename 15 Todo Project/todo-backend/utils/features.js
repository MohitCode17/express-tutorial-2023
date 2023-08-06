import jwt from "jsonwebtoken"

// Send cookie function
export const sendCookies = async (user, res, statusCode = 200, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, // 30mins
    })
    .json({
      success: true,
      message: message,
    });
};
