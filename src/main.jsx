import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";

import About from "./components/About";

import Contact from './components/Contact.jsx';

import Error from './components/Error.jsx';
import Body from './components/Body.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx';



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={appRouter}/>
  </StrictMode>,
)
