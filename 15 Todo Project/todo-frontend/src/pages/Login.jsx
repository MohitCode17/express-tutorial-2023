import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import "../styles/form.css";

const server = "http://localhost:8000/api/v1/users";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ============ Submit Handler For Login ===============
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const { data } = await axios.post(
        `${server}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      toast.success(data.message);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <section className="login">
      <form onSubmit={submitHandler}>
        <h2>SIGN IN</h2>
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
        <button type="submit">Sign In</button>
        <h3>or</h3>
        <p>
          Don't have account?{" "}
          <Link to={"/sign-up"} className="redirect-link">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
