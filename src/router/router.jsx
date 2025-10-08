import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Children, Component } from "react";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/authentication/RegisTer";
import Login from "../pages/authentication/LogIn";
import DashboardLayout from "../layout/DashboardLayout";
import AddBook from "../pages/Dashboard/AddBook";
import MyBooks from "../pages/Dashboard/MyBooks";
import BookDetails from "../pages/BookDetails";
import AllBooks from "../pages/Allbooks";
import ExchangeRequests from "../pages/Dashboard/ExchangeRequests";
 

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
           Component:DashboardLayout,
         children:[
          {
            path:"/dashboard/add-book",
            Component:AddBook,

          },
          {
            path:"/dashboard/my-books",
            Component:MyBooks
          },
          {
            path:"/dashboard/exchange-requests",
            Component:ExchangeRequests
          }
 
         ]
        },
        {
          path:"/book/:id",
          Component:BookDetails
        },
        {
          path:"/allbooks",
          Component:AllBooks
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