import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'

// import AuthenticationButton from "./Pages/Auth";
// import GoogleLogin from "./Pages/Auth";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Component/PrivateRoute";
import Navigation from "./Component/Navigation";

const router = createBrowserRouter([

  {
    path: "dashboard",
    element:<PrivateRoute element ={<Dashboard/>}/>  },
    
  {
    path: "/",
    element:<Homepage/>  },

   
]);



function App() {
  
  return (
   <div className="w-[100vw] h-[100vh] ">
   
       <RouterProvider router={router} />
   </div>
  )
}

export default App
