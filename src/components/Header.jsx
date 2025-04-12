import { useState, useContext } from "react";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

let Header = () => {
  let [login, setLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between shadow-lg rounded-xl p-4 mb-1 sticky top-0 z-50 bg-white mt-4">
      <div className="logo-container">
        <img className="w-20 rounded-lg" src={logo} alt="Flavour Dash Logo" />
      </div>

      <div className="nav-items">
        <ul className="flex p-5 space-x-4 items-center ">
          <li>Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            <Link to="/about">About Us</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            <Link to="/cart">Cart - ({cartItems.length})</Link>
          </li>
          <button
            className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl"
            onClick={() =>
              login === "Login" ? setLogin("Logout") : setLogin("Login")
            }
          >
            {login}
          </button>
          <li className="cursor-pointer hover:bg-amber-100 px-2 py-2 rounded-2xl">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
