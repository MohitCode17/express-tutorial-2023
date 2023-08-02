import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

// Middlewares
app.use(express.json());

// Database connection
const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mohitcodes17:mohitcodes17@cluster0.llirqm1.mongodb.net/"
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();

// schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Get all users api
app.get("/users/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

// Register user api
app.post("/register", async (req, res) => {
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
});

// Get user by id
app.get("/user/:id", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
