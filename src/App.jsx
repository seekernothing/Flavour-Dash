import Header from "./components/Header";

import Body from "./components/Body";

import { Outlet } from "react-router-dom";




let App = () => {
  return (
    <div className="app">
      <Header />
      {/* <Body /> */}
      <Outlet/>
    </div>
  );
};



export default App;
