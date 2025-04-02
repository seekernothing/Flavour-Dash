import { useState } from "react";
import logo from "./assets/logo.png"

let Header = () => {

  let [login, setLogin] = useState("Login")

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Flavour Dash Logo" />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button className="login" onClick={()=>login==="Login"?setLogin("Logout"):setLogin("Login")}>{login}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;