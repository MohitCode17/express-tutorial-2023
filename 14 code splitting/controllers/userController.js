import User from "../model/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ success: false, message: "All fields are required !" });
  }

  try {
    // check user exits before or not
    const user = await User.findOne({ email });

    if (user) {
      res
        .status(200)
        .json({ success: false, message: "Email is already registered !" });
    } else {
      // Create new user
      await User.create({
        name,
        email,
        password,
      });
      res
        .status(201)
        .json({ success: true, message: "User register successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
