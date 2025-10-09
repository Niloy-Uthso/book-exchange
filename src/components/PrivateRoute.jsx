import React from "react";
import { Navigate, useLocation } from "react-router";
import { ClipLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
// console.log(location)
  // 🔄 Show loader while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <ClipLoader color="#facc15" size={50} /> {/* Yellow spinner */}
      </div>
    );
  }

  // 🚫 If no user, redirect to login page
  if (!user) {
    console.log(location.pathname)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ✅ If user exists, show the protected content
  return children;
};

export default PrivateRoute;
