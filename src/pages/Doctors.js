import React, { useEffect, useState } from "react";
import {
  getDoctors,
  getDoctorSchedule,
  addDoctor,
  addDoctorSchedule,
} from "../services/api";
import { motion } from "framer-motion";
import { FiPhone, FiCalendar, FiUser, FiPlus, FiClock } from "react-icons/fi";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [newSchedule, setNewSchedule] = useState({
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  });
  const [newDoctor, setNewDoctor] = useState({
    nama: "",
    spesialisasi: "",
    no_telp: "",
  });

  useEffect(() => {
    console.log("useEffect dipanggil, memuat data dokter...");
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      console.log("Mengambil data dokter...");
      const response = await getDoctors(); // 🔹 API langsung mengembalikan array
      console.log("Data Dokter yang Diterima:", response); // 🔹 Cek apakah respons berisi array

      if (Array.isArray(response)) {
        setDoctors(response); // ✅ Langsung set response jika sudah array
      } else {
        console.error("Format data API tidak sesuai:", response);
        setDoctors([]); // 🚨 Pastikan tidak error saat render
      }
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error);
      setDoctors([]); // 🚨 Hindari state undefined
    }
  };

  const fetchDoctorSchedule = async (doctorId) => {
    try {
      const response = await getDoctorSchedule(doctorId);
      setSchedule(response);
    } catch (error) {
      console.error("Gagal mengambil jadwal dokter", error);
    }
  };

  const handleViewSchedule = async (doctor) => {
    setSelectedDoctor(doctor);
    await fetchDoctorSchedule(doctor.id);
    setShowScheduleModal(true);
  };

  const handleAddSchedule = async () => {
    if (
      !newSchedule.hari ||
      !newSchedule.jam_mulai ||
      !newSchedule.jam_selesai
    ) {
      alert("Semua field harus diisi!");
      return;
    }
    try {
      await addDoctorSchedule(selectedDoctor.id, {
        hari: newSchedule.hari,
        jam_mulai: newSchedule.jam_mulai,
        jam_selesai: newSchedule.jam_selesai,
      });
      setNewSchedule({ hari: "", jam_mulai: "", jam_selesai: "" });
      fetchDoctorSchedule(selectedDoctor.id);
      setShowAddScheduleModal(false);
    } catch (error) {
      console.error("Gagal menambahkan jadwal dokter:", error);
    }
  };

  const handleAddDoctor = async () => {
    if (!newDoctor.nama || !newDoctor.spesialisasi || !newDoctor.no_telp) {
      alert("Semua field harus diisi!");
      return;
    }
    await addDoctor(newDoctor);
    setShowAddModal(false);
    setNewDoctor({ nama: "", spesialisasi: "", no_telp: "" });
    fetchDoctors();
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Manajemen Dokter
      </h2>
      {/* Tombol Tambah Dokter */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
        >
          <FiPlus className="mr-2" /> Tambah Dokter
        </button>
      </div>

      {/* Input Pencarian */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari dokter berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Daftar Dokter */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center w-48"
          >
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-3">
              <FiUser className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{doctor.nama}</h3>
            <p className="text-gray-600 text-sm">{doctor.spesialisasi}</p>
            <p className="text-gray-500 flex items-center text-sm">
              <FiPhone className="mr-1 text-blue-500" /> {doctor.no_telp}
            </p>
            <button
              onClick={() => handleViewSchedule(doctor)}
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              <FiCalendar className="inline-block mr-1" /> Lihat Jadwal
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal Jadwal Dokter */}
      {showScheduleModal && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Jadwal Praktek - {selectedDoctor.nama}
            </h3>
            {schedule.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-700">
                {schedule.map((item) => (
                  <li key={item.id}>
                    {item.hari}, {item.jam_mulai} - {item.jam_selesai}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Jadwal belum tersedia</p>
            )}
            <button
              onClick={() => setShowAddScheduleModal(true)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Tambah Jadwal
            </button>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Tambah Jadwal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Tambah Jadwal
            </h3>
            <select
              value={newSchedule.hari}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, hari: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            >
              <option value="">Pilih Hari</option>
              {[
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={newSchedule.jam_mulai}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, jam_mulai: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            />
            <input
              type="time"
              value={newSchedule.jam_selesai}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, jam_selesai: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            />
            <button
              onClick={handleAddSchedule}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Simpan
            </button>
            <button
              onClick={() => setShowAddScheduleModal(false)}
              className="w-full bg-gray-400 text-white p-3 rounded-lg mt-2 hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ✅ Pastikan Modal Tambah Dokter Ditutup dengan Benar */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Tambah Dokter
            </h3>
            <input
              type="text"
              placeholder="Nama Dokter"
              value={newDoctor.nama}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, nama: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            />
            <input
              type="text"
              placeholder="Spesialisasi"
              value={newDoctor.spesialisasi}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, spesialisasi: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            />
            <input
              type="text"
              placeholder="No Telepon"
              value={newDoctor.no_telp}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, no_telp: e.target.value })
              }
              className="p-2 border rounded-lg w-full mb-3"
            />
            <button
              onClick={handleAddDoctor}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Simpan
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-gray-400 text-white p-3 rounded-lg mt-2 hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
