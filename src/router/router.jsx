import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Children, Component } from "react";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    Children:[
        {
            index:true,
            Component: Home
        }
    ]

  },
]);