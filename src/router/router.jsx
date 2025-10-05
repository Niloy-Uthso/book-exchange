import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Children, Component } from "react";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/authentication/RegisTer";
import Login from "../pages/authentication/LogIn";
import DashboardLayout from "../layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    children:[
        {
            index:true,
            Component: Home
        },
        {
          path:"dashboard",
           Component:DashboardLayout
         
        }
    ]

  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path:"/register",
        Component:Register
      },
      {
        path:"/login",
        Component:Login
      }
    ]
  }
]);