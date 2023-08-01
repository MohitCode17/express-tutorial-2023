const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const port = 5000;

// database connect
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
});

const User = mongoose.model("User", userSchema);

// template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// auth middleware
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decodeData = jwt.verify(token, "dasflsdjfwerofdsnvcnvljfofwefhf");
    req.user = await User.findById(decodeData._id);
    next();
  } else {
    res.render("login");
  }
};

// home routes
app.get("/", isAuthenticated, (req, res) => {
  const { name } = req.user;
  res.render("logout", { name });
});

// login
app.post("/login", async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({email});

  if(!user) {
    return console.log("Email is not registered !");
  }
  
  user = await User.create({
    name,
    email,
  });

  // generate jwt token
  const token = jwt.sign({ _id: user._id }, "dasflsdjfwerofdsnvcnvljfofwefhf");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});

// logout
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
