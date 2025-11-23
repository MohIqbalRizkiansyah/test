import React, { useEffect, useState } from "react";
import { getPayments, getPatients } from "../services/api";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const Payments = () => {
  const [payments, setPayments] = useState([]); // Default: []
  const [patients, setPatients] = useState([]); // 🔹 Pastikan ini bukan undefined
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    console.log("Fetching data...");
    fetchPayments();
    fetchPatients();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      console.log("Data Pembayaran:", response.data); // 🔹 Cek apakah data benar-benar ada
      setPayments(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pembayaran:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      console.log("Mengambil data pasien...");
      const response = await getPatients();
      console.log("Data Pasien yang Diterima:", response); // 🔹 Cek apakah respons API berisi data
      setPatients(response);
    } catch (error) {
      console.error("Gagal mengambil data pasien:", error);
    }
  };
  

  // Fungsi untuk mendapatkan nama pasien dari ID
  const getPatientName = (id) => {
    if (!patients || !Array.isArray(patients) || patients.length === 0) return "Memuat...";
    console.log("Mencari pasien dengan ID:", id, "di", patients);
    const patient = patients.find((p) => Number(p.id) === Number(id));
    return patient ? patient.nama : "Tidak Diketahui";
  };
  

  const filteredPayments = payments.filter(
    (payment) => statusFilter === "all" || payment.status === statusFilter
  );

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Daftar Pembayaran
      </h2>

      {/* Filter Status Pembayaran */}
      <div className="mb-6 flex justify-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Semua</option>
          <option value="menunggu">Menunggu</option>
          <option value="dibayar">Dibayar</option>
          <option value="gagal">Gagal</option>
        </select>
      </div>

      {/* Daftar Pembayaran */}
      <div className="p-6 ml-64">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Nama Pasien</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-3 text-gray-500 text-center">
                  Tidak ada data pembayaran.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="text-center bg-white hover:bg-gray-100 transition"
                >
                  <td className="p-3 border">
                    {getPatientName(payment.pasien_id)}
                  </td>
                  <td className="p-3 border">
                    Rp{payment.jumlah.toLocaleString()}
                  </td>
                  <td className="p-3 border flex justify-center items-center space-x-2">
                    {payment.status === "dibayar" && (
                      <FiCheckCircle className="text-green-500" />
                    )}
                    {payment.status === "menunggu" && (
                      <FiClock className="text-yellow-500" />
                    )}
                    {payment.status === "gagal" && (
                      <FiXCircle className="text-red-500" />
                    )}
                    <span className="capitalize">{payment.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
