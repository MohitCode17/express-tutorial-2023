import mongoose from "mongoose";


// schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

export default User;