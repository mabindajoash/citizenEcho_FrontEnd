import React from "react";
import { FaBell, FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="logo" className="h-12 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8 text-gray-600 text-sm font-medium">
        <a href="/" className="hover:text-blue-600 transition duration-300">Home</a>
        <a href="/resources" className="hover:text-blue-600 transition duration-300">Resources</a>
        <a href="/aboutus" className="hover:text-blue-600 transition duration-300">About Us</a>
        <a href="/report" className="hover:text-blue-600 transition duration-300">Report</a>
      </nav>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Contact */}
        <div className="hidden md:flex items-center text-gray-500 text-sm space-x-2">
          <FaPhoneAlt size={14} />
          <span>123-456-7890</span>
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell size={18} className="text-gray-500 hover:text-blue-600 transition" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center text-gray-600 text-sm space-x-1 cursor-pointer hover:text-blue-600 transition">
          <span>Joash Asila Mabinda</span>
          <IoIosArrowDown size={18} />
        </div>

        {/* Contact Us Button */}
        <Link
          to="/contactus"
          className="bg-blue-500 hover:bg-blue-600 transition text-white text-sm px-4 py-1.5 rounded-full"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
