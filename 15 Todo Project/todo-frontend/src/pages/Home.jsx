import { useContext } from "react"
import { Context } from "../main"
import "../styles/home.css"

const Home = () => {

  const { user, setIsAuthenticated } = useContext(Context);

  console.log(user);

  return (
    <div className="todo-wrapper">
      <h1>Welcome, Mohit</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        <div className="todo is-complete">
          <div className="checkbox"></div>
          <div className="text">Buy a mangoes</div>
          <div className="delete-todo">x</div>
        </div>
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">Buy a mangoes</div>
          <div className="delete-todo">x</div>
        </div>
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">Buy a mangoes</div>
          <div className="delete-todo">x</div>
        </div>
      </div>

    </div>
  )
}

export default Home