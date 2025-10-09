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
import BorrowedBooks from "../pages/Dashboard/BorrowedBooks";
import PrivateRoute from "../components/PrivateRoute";
 

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
                  element: 
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>,
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
          },
          {
            path:"/dashboard/borrowed-books",
            Component:BorrowedBooks
          }
 
         ]
        },
        {
          path:"/book/:id",
           element:<PrivateRoute>
            <BookDetails></BookDetails>
           </PrivateRoute>
          
          // BookDetails
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