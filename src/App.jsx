//import logo from "./assets/logo.png";

// Header:

// -Logo
// -Nav Items

// Body:

// -Searchbar
// -Restaurant-container
// -Restaurant-card

// Footer:

// -Copyright
// -Links
// -Adress
// -Contact

import logo from "./assets/logo.png";

let Header = () => {
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
        </ul>
      </div>
    </div>
  );
};

let RestaurantCard = (props) => {
  console.log(props)
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e0vvulfbahjxjz6k4uwi"
        alt="Biryami"
      />

      <h2>{props.resName}</h2>
      <h4>{props.cusine}</h4>
      <h4>{props.ratings}</h4>
      <h4>{props.deliverytime}</h4>
    </div>
  );
};

let Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        <RestaurantCard
          resName="Meghna Foods"
          cusine="Biryani, North Indian, Asian"
          ratings="4.4 stars"
          deliverytime="30 minutes"
        />
        <RestaurantCard
          resName="KFC"
          cusine="Burger, Fries,Fast food"
          ratings="4.1 stars"
          deliverytime="20 minutes"
        />
      </div>
    </div>
  );
};

let App = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

export default App;
