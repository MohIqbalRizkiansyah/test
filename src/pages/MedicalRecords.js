import React, { useEffect, useState } from "react";
import { getMedicalRecords, addMedicalRecord, deleteMedicalRecord, getPatients, getDoctors } from "../services/api";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newRecord, setNewRecord] = useState({ pasien_id: "", dokter_id: "", diagnosis: "", perawatan: "" });

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchRecords = async () => {
    const response = await getMedicalRecords();
    setRecords(response || []);
  };

  const fetchPatients = async () => {
    const response = await getPatients();
    setPatients(response || []);
  };

  const fetchDoctors = async () => {
    const response = await getDoctors();
    setDoctors(response || []);
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!newRecord.pasien_id || !newRecord.dokter_id || !newRecord.diagnosis || !newRecord.perawatan) {
      alert("Semua field harus diisi!");
      return;
    }
    await addMedicalRecord(newRecord);
    setNewRecord({ pasien_id: "", dokter_id: "", diagnosis: "", perawatan: "" });
    fetchRecords();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus rekam medis ini?")) {
      await deleteMedicalRecord(id);
      fetchRecords();
    }
  };

  const getPatientName = (id) => {
    return patients.find((p) => Number(p.id) === Number(id))?.nama || "Tidak Diketahui";
  };

  const getDoctorName = (id) => {
    return doctors.find((d) => Number(d.id) === Number(id))?.nama || "Tidak Diketahui";
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manajemen Rekam Medis</h2>

      {/* Form Tambah Rekam Medis */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Tambah Rekam Medis</h3>
        <form onSubmit={handleAddRecord} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newRecord.pasien_id}
            onChange={(e) => setNewRecord({ ...newRecord, pasien_id: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Pasien</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.nama}</option>
            ))}
          </select>
          <select
            value={newRecord.dokter_id}
            onChange={(e) => setNewRecord({ ...newRecord, dokter_id: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Dokter</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.nama}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Diagnosis"
            value={newRecord.diagnosis}
            onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Perawatan"
            value={newRecord.perawatan}
            onChange={(e) => setNewRecord({ ...newRecord, perawatan: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition w-full">
            Tambah
          </button>
        </form>
      </div>

      {/* Tabel Rekam Medis */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Nama Pasien</th>
              <th className="p-3 border">Nama Dokter</th>
              <th className="p-3 border">Diagnosis</th>
              <th className="p-3 border">Perawatan</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-gray-500 text-center">Tidak ada data rekam medis.</td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="text-center bg-white hover:bg-gray-100 transition">
                  <td className="p-3 border">{getPatientName(record.pasien_id)}</td>
                  <td className="p-3 border">{getDoctorName(record.dokter_id)}</td>
                  <td className="p-3 border">{record.diagnosis}</td>
                  <td className="p-3 border">{record.perawatan}</td>
                  <td className="p-3 border">
                    <button onClick={() => handleDelete(record.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                      Hapus
                    </button>
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

export default MedicalRecords;
