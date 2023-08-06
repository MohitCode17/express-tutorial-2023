import { useContext } from "react";
import { Context } from "../main";

const Profile = () => {
  const { user, setIsAuthenticated } = useContext(Context);

  console.log(user);

  return (
    <div>Profile</div>
  )
}

export default Profile