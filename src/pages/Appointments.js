import React, { useEffect, useState, useCallback } from "react";
import {
  getAppointments,
  getPatients,
  getDoctors,
  addAppointment,
  deleteAppointment,
  updateAppointment,
} from "../services/api";
import { FiTrash2} from "react-icons/fi";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAppointment, setNewAppointment] = useState({
    pasien_id: "",
    dokter_id: "",
    tanggal_janji: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    await fetchAppointments();
    await fetchPatients();
    await fetchDoctors();
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response || []);
    } catch (error) {
      console.error("Gagal mengambil data janji temu:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response || []);
    } catch (error) {
      console.error("Gagal mengambil data pasien:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response || []);
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      await updateAppointment(id, { status: newStatus });
      loadData(); // Reload data setelah update status
    } catch (error) {
      console.error("Gagal memperbarui status janji temu:", error);
    }
  };

  const getPatientName = (id) => {
    return patients.find((p) => Number(p.id) === Number(id))?.nama || "Tidak Diketahui";
  };

  const getDoctorName = (id) => {
    return doctors.find((d) => Number(d.id) === Number(id))?.nama || "Tidak Diketahui";
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment.pasien_id || !newAppointment.dokter_id || !newAppointment.tanggal_janji || newAppointment.status) {
      alert("Semua field harus diisi!");
      return;
    }
    await addAppointment(newAppointment);
    setNewAppointment({ pasien_id: "", dokter_id: "", tanggal_janji: "", status: "dijadwalkan" });
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus janji temu ini?")) {
      await deleteAppointment(id);
      loadData();
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Janji Temu</h2>

      {/* Form Tambah Janji Temu */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Tambah Janji Temu</h3>
        <form onSubmit={handleAddAppointment} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={newAppointment.pasien_id}
            onChange={(e) => setNewAppointment({ ...newAppointment, pasien_id: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Pasien</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.nama}</option>
            ))}
          </select>
          <select
            value={newAppointment.dokter_id}
            onChange={(e) => setNewAppointment({ ...newAppointment, dokter_id: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Dokter</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.nama}</option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={newAppointment.tanggal_janji}
            onChange={(e) => setNewAppointment({ ...newAppointment, tanggal_janji: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="text"
            value={newAppointment.status}
            onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          /> */}
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition w-full">
            Tambah
          </button>
        </form>
      </div>

      {/* Tabel Janji Temu */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Nama Pasien</th>
              <th className="p-3 border">Nama Dokter</th>
              <th className="p-3 border">Tanggal Janji</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-3 text-gray-500 text-center">Memuat data...</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="text-center bg-white hover:bg-gray-100 transition">
                  <td className="p-3 border">{getPatientName(appointment.pasien_id)}</td>
                  <td className="p-3 border">{getDoctorName(appointment.dokter_id)}</td>
                  <td className="p-3 border">{new Date(appointment.tanggal_janji).toLocaleString()}</td>
                  ,<td className="p-3 border">{}</td>
                  <td className="p-3 border">
                    <select
                      value={appointment.status}
                      onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                      className="p-2 border rounded-lg bg-white"
                    >
                      <option value="dijadwalkan">Dijadwalkan</option>
                      <option value="selesai">Selesai</option>
                      <option value="dibatalkan">Dibatalkan</option>
                    </select>
                  </td>
                  <td className="p-3 border">
                    <button onClick={() => handleDelete(appointment.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                      <FiTrash2 className="mr-1" /> Hapus
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

export default Appointments;
