import axios from "axios";

const API_URL = "http://localhost:5000/api";

// 🔹 Ambil daftar antrian hari ini
export const getQueueToday = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/queue/today");
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil antrian", error);
    return [];
  }
};

// 🔹 Tambahkan pasien ke antrian
export const addQueue = async (data) => {
  try {
    await fetch("http://localhost:5000/api/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Gagal menambahkan antrian", error);
  }
};

// 🔹 Perbarui status antrian
export const updateQueueStatus = async (id, data) => {
  try {
    await fetch(`http://localhost:5000/api/queue/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Gagal memperbarui status antrian", error);
  }
};

// 🔹 Hapus antrian
export const deleteQueue = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/queue/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Gagal menghapus antrian", error);
  }
};

// 🔹 Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, userData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Gagal login" };
  }
};

// 🔹 Patients
export const getPatients = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/pasien");
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data pasien", error);
    return [];
  }
};

export const addPatient = async (patient) => {
  try {
    return await axios.post(`${API_URL}/pasien`, patient);
  } catch (error) {
    return { success: false, message: "Gagal menambahkan pasien" };
  }
};

export const deletePatient = async (id) => {
  try {
    return await axios.delete(`${API_URL}/pasien/${id}`);
  } catch (error) {
    return { success: false, message: "Gagal menghapus pasien" };
  }
};

// 🔹 Doctors
export const getDoctors = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/dokter");
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data dokter", error);
    return [];
  }
};

export const addDoctor = async (doctor) => {
  try {
    return await axios.post(`${API_URL}/dokter`, doctor);
  } catch (error) {
    return { success: false, message: "Gagal menambahkan dokter" };
  }
};

export const deleteDoctor = async (id) => {
  try {
    return await axios.delete(`${API_URL}/dokter/${id}`);
  } catch (error) {
    return { success: false, message: "Gagal menghapus dokter" };
  }
};

// 🔹 Medical Records
export const getMedicalRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/rekam_medis`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data rekam medis", error);
    return [];
  }
};

// 🔹 Ambil daftar janji temu
export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data; // Pastikan backend mengembalikan data dalam format yang sesuai
  } catch (error) {
    console.error("Gagal mengambil data janji temu:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
};

// 🔹 Tambahkan janji temu
export const addAppointment = async (appointment) => {
  try {
    return await axios.post(`${API_URL}/appointments`, appointment);
  } catch (error) {
    return { success: false, message: "Gagal menambahkan janji temu" };
  }
};

// 🔹 Perbarui janji temu
export const updateAppointment = async (id, data) => {
  try {
    return await axios.put(`${API_URL}/appointments/${id}`, data);
  } catch (error) {
    return { success: false, message: "Gagal memperbarui janji temu" };
  }
};

// 🔹 Hapus janji temu
export const deleteAppointment = async (id) => {
  try {
    return await axios.delete(`${API_URL}/appointments/${id}`);
  } catch (error) {
    return { success: false, message: "Gagal menghapus janji temu" };
  }
};

// 🔹 Ambil jadwal dokter
export const getDoctorSchedule = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/doctors/${doctorId}/schedule`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jadwal dokter", error);
    return [];
  }
};

// 🔹 Tambahkan jadwal dokter
export const addDoctorSchedule = async (doctorId, schedule) => {
  try {
    return await axios.post(`${API_URL}/doctors/${doctorId}/schedule`, schedule);
  } catch (error) {
    return { success: false, message: "Gagal menambahkan jadwal dokter" };
  }
};

// 🔹 Tambahkan rekam medis
export const addMedicalRecord = async (record) => {
  try {
    return await axios.post(`${API_URL}/rekam_medis`, record);
  } catch (error) {
    return { success: false, message: "Gagal menambahkan rekam medis" };
  }
};

// 🔹 Hapus rekam medis
export const deleteMedicalRecord = async (id) => {
  try {
    return await axios.delete(`${API_URL}/rekam_medis/${id}`);
  } catch (error) {
    return { success: false, message: "Gagal menghapus rekam medis" };
  }
};

// 🔹 Ambil pembayaran
export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/payments`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data pembayaran", error);
    return [];
  }
};

// 🔹 Ambil pengguna
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data pengguna", error);
    return [];
  }
};

// 🔹 Hapus pengguna
export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    return { success: false, message: "Gagal menghapus pengguna" };
  }
};
