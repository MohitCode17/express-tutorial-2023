import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"

const Home = () => {
  return (
    <div className="home">
      <h1>Your Tasks, Your Way</h1>
      <Link to={"/sign-in"} className="homeBtn" >Continue with Todo <AiOutlineArrowRight/></Link>
    </div>
  )
}

export default Home