
import "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

import { useAuthContext } from "./Hooks/useAuthContext";
const App = () => {
  const {user,loading}=useAuthContext();

  if(loading){
    return <div>loading.....</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element:user? <Home/> : <Navigate to= "/login"/>,
        },
        {
          path: "/signup",
          element: !user ? <Signup/> : <Navigate to="/"/> 
        },
        {
          path: "/login",
          element: !user ? <Login/> : <Navigate to="/"/>
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;