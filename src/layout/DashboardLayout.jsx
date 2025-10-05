import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X, BookOpen, MessageSquare, Repeat } from "lucide-react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false); // close on link click (mobile)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">📚 Dashboard</h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          <NavLink
            to="/dashboard/my-books"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-2 hover:bg-blue-50 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            <BookOpen size={20} /> My Books
          </NavLink>

          <NavLink
            to="/dashboard/exchange-requests"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-2 hover:bg-blue-50 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            <Repeat size={20} /> Exchange Requests
          </NavLink>

          <NavLink
            to="/dashboard/messages"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-2 hover:bg-blue-50 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            <MessageSquare size={20} /> Messages
          </NavLink>

          <div className="px-6 mt-4">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow-sm p-4 md:hidden">
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-blue-600">Dashboard</h2>
        </div>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
