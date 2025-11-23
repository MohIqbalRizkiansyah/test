import {  useNavigate, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { FiUser, FiLogOut, FiMenu, FiHome, FiUsers, FiCalendar, FiDollarSign, FiFileText } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "Pengguna";
  const userAvatar = "https://i.pravatar.cc/40";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      {/* Tombol Menu (Mobile) */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </button>

      {/* Navigasi Menu */}
      <div className="h-screen w-64 bg-white shadow-md fixed left-0 top-0 p-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 mb-6">Klinik Kesehatan</div>

      {/* Menu Items */}
      <nav className="space-y-2">
        <NavItem to="/" icon={<FiHome />} label="Dashboard" />
        <NavItem to="/doctors" icon={<FiUser />} label="Doctors" />
        <NavItem to="/patients" icon={<FiUsers />} label="Patients" />
        <NavItem to="/appointments" icon={<FiCalendar />} label="Appointments" />
        <NavItem to="/payments" icon={<FiDollarSign />} label="Payments" />
        <NavItem to="/medical-records" icon={<FiFileText />} label="Medical Records" />
      </nav>
    </div>
    </nav>
  );
};
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
        isActive ? "bg-blue-500 text-white" : ""
      }`
    }
  >
    <span className="text-lg mr-3">{icon}</span>
    {label}
  </NavLink>
);
export default Navbar;
