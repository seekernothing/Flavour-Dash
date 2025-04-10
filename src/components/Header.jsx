import { useState,useContext } from "react";
import logo from "./assets/logo.png"
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

let Header = () => {

  let [login, setLogin] = useState("Login")
  const onlineStatus = useOnlineStatus()
  const{ loggedInUser } = useContext(UserContext)
  

  return (
    <div className="flex justify-between shadow-lg rounded-xl p-4 mb-1 sticky top-0 z-50 bg-white mt-4">
      <div className="logo-container">
        <img className="w-20 rounded-lg" src={logo} alt="Flavour Dash Logo" />
      </div>

      <div className="nav-items">
        <ul className="flex p-5 space-x-4 items-center ">
          <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            <Link to="/about">About Us</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            Cart
          </li>
          <button
            className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out"
            onClick={() =>
              login === "Login" ? setLogin("Logout") : setLogin("Login")
            }
          >
            {login}
          </button>

          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl transition-all delay-100 duration-300 ease-in-out">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;