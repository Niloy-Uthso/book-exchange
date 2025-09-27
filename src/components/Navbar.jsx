import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

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

  const menuItems = (
    <>
      <li>
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/books" onClick={handleLinkClick}>
          All Books
        </Link>
      </li>
      {user && (
        <li>
          <Link to="/my-books" onClick={handleLinkClick}>
            My Books
          </Link>
        </li>
      )}
      {user && (
        <li>
          <Link to="/dashboard" onClick={handleLinkClick}>
            Dashboard
          </Link>
        </li>
      )}
      {user ? (
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-red-600 duration-200"
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <Link to="/login" onClick={handleLinkClick}>
            Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-600"
            onClick={handleLinkClick}
          >
            <img
              src="https://i.ibb.co/8PptbL2/book-logo.png"
              alt="BookExchange"
              className="h-8 w-8 object-cover"
            />
            BookExchange
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
            {menuItems}

            {/* User Avatar */}
            {user?.photoURL && (
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                />
                {/* Hover Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-3 hidden group-hover:block">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email || ""}</p>
                </div>
              </div>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-start p-4 gap-3 text-gray-700 font-medium">
            {menuItems}
            {user?.photoURL && (
              <div className="mt-2">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-sm text-gray-500">{user.email || ""}</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
