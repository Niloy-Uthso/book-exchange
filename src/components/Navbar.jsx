import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      handleLinkClick();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  
  const navLinks = (
    <>
      <li>
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/allbooks" onClick={handleLinkClick}>
          All Books
        </Link>
      </li>
      
      {user && (
        <li>
          <Link to="/dashboard" onClick={handleLinkClick}>
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

   
  const authSection = (
    <>
      {user ? (
        <div className="flex items-center gap-3">
           
          <div className="relative group">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-3 hidden group-hover:block">
              <p className="font-semibold">{user.displayName || "User"}</p>
              <p className="text-sm text-gray-500">{user.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="hover:text-red-600 duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            onClick={handleLinkClick}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={handleLinkClick}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
           
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-600"
            onClick={handleLinkClick}
          >
            <img
              src="https://i.ibb.co.com/Ng8yDYmL/images-q-tbn-ANd9-Gc-RBMar0-A-r-KXcp9e0-X2974-Tq-IRq1-HXb01-OD7-A-s.jpg"
              alt="BookSwap"
              className="h-8 w-8 object-cover"
            />
           BookSwap
          </Link>

           
          <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
            {navLinks}
          </ul>

           
          <div className="hidden md:flex items-center space-x-4 text-gray-700 font-medium">
            {authSection}
          </div>

           
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

       
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-start p-4 gap-3 text-gray-700 font-medium">
            {navLinks}
            <div className="mt-2">{authSection}</div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
