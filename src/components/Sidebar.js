import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiUser, FiCalendar, FiFileText, FiCreditCard } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation(); // Untuk menandai menu yang aktif

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Pasien", path: "/patients", icon: <FiUsers /> },
    { name: "Dokter", path: "/doctors", icon: <FiUser /> },
    { name: "Janji Temu", path: "/appointments", icon: <FiCalendar /> },
    { name: "Rekam Medis", path: "/medical-records", icon: <FiFileText /> },
    { name: "Pembayaran", path: "/payments", icon: <FiCreditCard /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 shadow-lg fixed">
      <h2 className="text-xl font-bold mb-6 text-center tracking-wide">Klinik Sehat</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-3">
            <Link
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition ${
                location.pathname === item.path ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span> {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
