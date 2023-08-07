import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../main";
import "../styles/form.css";

const server = "http://localhost:8000/api/v1";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const {value, name} = e.target;
    setFormData((prevData) => (
      {...prevData, [name]: value}
    ));
  };

  
  // ============== Submit handler for Register User ================
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to={"/todo"} />;

  return (
      <section className="register">
        <form onSubmit={submitHandler}>
          <h2>SIGN UP WITH TODO</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            required
          />
          <button type="submit">Sign Up</button>
          <h3>or</h3>
          <p>Already a user? <Link to={"/sign-in"} className="redirect-link">Sign In</Link></p>
        </form>
      </section>
  );
};

export default Register;