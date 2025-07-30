import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSketch, FaSignsPost } from "react-icons/fa6";
import { FaPersonHalfDress } from "react-icons/fa6";
import { BiSolidLogOutCircle } from "react-icons/bi";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative h-auto w-56 bg-gray-800 text-white p-6">
      <nav className="sticky right-0 top-24 left-0 space-y-4">
        <Link
          to="/admin"
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${
            isActive("/admin") ? "bg-gray-700" : ""
          }`}
        >
          <FaHome className="mr-2" />
          Home
        </Link>

        <Link
          to="/admin/inquiries"
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${
            isActive("/admin/inquiries") ? "bg-gray-700" : ""
          }`}
        >
          <FaSketch className="mr-2" />
          Inquiries
        </Link>

        <Link
          to="/admin/reports"
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${
            isActive("/admin/reports") ? "bg-gray-700" : ""
          }`}
        >
          <FaSignsPost className="mr-2" />
          Reports
        </Link>

        <Link
          to="/admin/users"
          className={`flex items-center p-2 rounded hover:bg-gray-700 ${
            isActive("/admin/users") ? "bg-gray-700" : ""
          }`}
        >
          <FaPersonHalfDress className="mr-2" />
          Users
        </Link>

        <Link
          to="/admin/logout"
          className="flex items-center p-2 rounded hover:bg-gray-700"
        >
          <BiSolidLogOutCircle className="mr-2" />
          Logout
        </Link>
      </nav>
    </div>
  );
}
