import React from "react";
import { Navigate, useLocation } from "react-router";
import { ClipLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
 
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <ClipLoader color="#facc15" size={50} />  
      </div>
    );
  }

   
  if (!user) {
    (location.pathname)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

   
  return children;
};

export default PrivateRoute;
