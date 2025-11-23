import React, { useState, useEffect } from "react";
// import { Bar, Line } from "react-chartjs-2";
import { FiUsers, FiCalendar, FiUserCheck, FiDollarSign, FiCheckCircle } from "react-icons/fi";
// import { getMonthlyRevenue } from "../services/api";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalPayments: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  // const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchStats();
    // getMonthlyRevenue().then((data) => setRevenueData(data));
    fetch("/api/dashboard/recent-appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));

    fetch("/api/dashboard/recent-payments")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Gagal mengambil data dashboard", error);
    }
  };

  // const chartData = {
  //   labels: ["Pasien", "Janji Temu", "Dokter", "Pendapatan"],
  //   datasets: [
  //     {
  //       label: "Statistik Klinik",
  //       data: [
  //         stats.totalPatients,
  //         stats.totalAppointments,
  //         stats.totalDoctors,
  //         stats.totalPayments,
  //       ],
  //       backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
  //     },
  //   ],
  // };

  // const revenueChartData = {
  //   labels:
  //     revenueData.length > 0
  //       ? revenueData.map((d) => `Bulan ${d.bulan}`)
  //       : ["Data Tidak Tersedia"],
  //   datasets: [
  //     {
  //       label: "Pendapatan Klinik",
  //       data:
  //         revenueData.length > 0
  //           ? revenueData.map((d) => d.total_pendapatan)
  //           : [0],
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //     },
  //   ],
  // };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Klinik
      </h2>

      {/* Statistik Klinik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Doctors",
            value: stats.totalDoctors,
            color: "text-blue-600",
            icon: <FiUserCheck size={28} />,
          },
          {
            title: "Total Patients",
            value: stats.totalPatients,
            color: "text-purple-600",
            icon: <FiUsers size={28} />,
          },
          {
            title: "Appointments",
            value: stats.totalAppointments,
            color: "text-yellow-600",
            icon: <FiCalendar size={28} />,
          },
          {
            title: "Revenue",
            value: `Rp.${stats.totalPayments}`,
            color: "text-green-600",
            icon: <FiDollarSign size={28} />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-medium ${stat.color}`}>
                {stat.percentage}
              </span>
            </div>
            <div className="text-gray-400">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Recent Appointments</h3>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="flex justify-between p-2 border-b">
                <div>
                  <h4 className="text-md font-medium">
                    {appointment.patient_name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {appointment.jenis_konsultasi}
                  </p>
                </div>
                <span className="text-blue-500">{appointment.waktu}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent appointments</p>
          )}
        </div>

        {/* Recent Payments */}
        <div className="bg-white p-4 rounded-lg shadow-md ">
          <h3 className="text-lg font-semibold mb-2">Recent Payments</h3>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div key={index} className="flex justify-between p-2 border-b">
                <div className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <div>
                    <h4 className="text-md font-medium">Payment Received</h4>
                    <p className="text-sm text-gray-500">
                      #{payment.invoice_no}
                    </p>
                  </div>
                </div>
                <span className="text-gray-700 font-semibold">
                  ${payment.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent payments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
