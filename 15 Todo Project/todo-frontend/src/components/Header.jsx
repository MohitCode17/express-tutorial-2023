import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/header.css"

const server = "http://localhost:8000/api/v1/users";

const Header = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message);
    } catch (error) {
      setIsAuthenticated(true);
      toast.success(error.response.data.message);
    }
  };

  return (
    <header className="header">
      <img src="./logo.svg" alt="todoLogo" width={100} />
      <nav className="nav">
        <Link to={"/"} className="nav_link">
          Home
        </Link>
        <Link to={"/profile"} className="nav_link">
          Profile
        </Link>
        {isAuthenticated ? (
          <button onClick={logoutHandler} className="button">
            Logout
          </button>
        ) : (
          <Link to={"/sign-in"} className="nav_link">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
