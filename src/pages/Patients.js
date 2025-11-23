import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pasien");
      setPatients(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pasien", error);
    }
  };

  const addPatient = async () => {
    if (!name || !dob || !phone || !address) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/pasien", {
        nama: name,
        tanggal_lahir: dob,
        no_telp: phone,
        alamat: address,
      });

      if (response.status === 201) {
        setName("");
        setDob("");
        setPhone("");
        setAddress("");
        fetchPatients();
      }
    } catch (error) {
      console.error("Gagal menambahkan pasien", error);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pasien ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/pasien/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Gagal menghapus pasien", error);
    }
  };

  

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Pasien</h1>

      {/* Form Input */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Tambah Pasien</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Pasien"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="date"
            placeholder="Tanggal Lahir"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="No Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border rounded-lg w-full"
          />
        </div>
        <button
          onClick={addPatient}
          className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Tambah Pasien
        </button>
      </motion.div>

      {/* Daftar Pasien */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daftar Pasien</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-800">{patient.nama}</h3>
            <p className="text-gray-600">📅 {patient.tanggal_lahir}</p>
            <p className="text-gray-600">📞 {patient.no_telp}</p>
            <p className="text-gray-600">🏠 {patient.alamat}</p>
            <button
              onClick={() => deletePatient(patient.id)}
              className="mt-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
