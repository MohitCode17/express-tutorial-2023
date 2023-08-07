import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context } from "./main"
import TodoPage from "./pages/TodoPage"

const server = "http://localhost:8000/api/v1";

const App = () => {

  const { setUser, setIsAuthenticated } = useContext(Context);

  // Get user profile on rendering this component
  useEffect(() => {
    axios.get(`${server}/users/profile`, {withCredentials: true}).then((res) => {
      setUser(res.data.user);
      setIsAuthenticated(true);
    }).catch((error) => {
      setUser({});
      setIsAuthenticated(false);
    })
  }, []);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todo" element={<TodoPage/>} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App