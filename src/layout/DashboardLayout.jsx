import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Menu,
  X,
  BookOpen,
   
  Repeat,
  Home,
  ChevronLeft,
  ChevronRight,
  PlusSquare,
  BookCopy,  
} from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // for desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // for mobile

  const toggleDesktopSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const handleLinkClick = () => setIsMobileOpen(false); // close on link click (mobile)

  const menuItems = [
    {
      path: "/dashboard/add-book",
      label: "Add Book",
      icon: <PlusSquare size={20} />,
    },
    {
      path: "/dashboard/my-books",
      label: "My Books",
      icon: <BookOpen size={20} />,
    },
    {
      path: "/dashboard/exchange-requests",
      label: "Exchange Requests",
      icon: <Repeat size={20} />,
    },
    {
        path: "/dashboard/borrowed-books",
      label: "Borrowed Books",
      icon: <BookCopy size={20} />,
    },
     
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 top-0 left-0 h-full bg-white shadow-lg border-r transition-all duration-300 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen ? (
            <h2 className="text-xl font-bold text-blue-600">📚 Dashboard</h2>
          ) : (
            <h2 className="text-xl font-bold text-blue-600">📚</h2>
          )}

          <button className="md:hidden" onClick={toggleMobileSidebar}>
            <X size={22} />
          </button>
        </div>

        {/* Collapse button (desktop only) */}
        <button
          onClick={toggleDesktopSidebar}
          className="hidden md:flex items-center justify-center w-full py-2 border-b text-gray-500 hover:text-blue-600"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Nav Links */}
        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2 rounded-md hover:bg-blue-50 transition-all 
                 ${isActive ? "text-blue-600 font-medium" : "text-gray-700"}
                 ${!isSidebarOpen ? "justify-center" : ""}`
              }
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}

          <div
            className={`mt-6 border-t pt-3 ${!isSidebarOpen ? "text-center" : "px-5"}`}
          >
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 justify-center md:justify-start"
            >
              <Home size={18} />
              {isSidebarOpen && <span>Back to Home</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile only) */}
        <div className="flex items-center justify-between bg-white shadow-sm p-4 md:hidden">
          <button onClick={toggleMobileSidebar}>
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-blue-600">Dashboard</h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
