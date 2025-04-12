import Header from "./components/Header";

import Body from "./components/Body";

import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";

let App = () => {
  return (
    <Provider store={AppStore}>
      <div className="app">
        <Header />
        {/* <Body /> */}
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
