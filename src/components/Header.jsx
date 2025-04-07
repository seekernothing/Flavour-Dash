import { useState } from "react";
import logo from "./assets/logo.png"
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

let Header = () => {

  let [login, setLogin] = useState("Login")
  const onlineStatus = useOnlineStatus()

  return (
    <div className="flex justify-between shadow-lg rounded-xl p-4 mb-1 sticky top-0 z-50 bg-white mt-4">
      <div className="logo-container">
        <img className="w-18 rounded-lg" src={logo} alt="Flavour Dash Logo" />
      </div>

      <div className="nav-items">
        <ul className="flex p-5 space-x-4 items-center ">
          <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() =>
              login === "Login" ? setLogin("Logout") : setLogin("Login")
            }
          >
            {login}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;