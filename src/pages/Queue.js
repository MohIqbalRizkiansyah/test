import React, { useEffect, useState } from "react";
import { getQueueToday, addQueue, updateQueueStatus, deleteQueue } from "../services/api";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    const response = await getQueueToday();
    setQueue(response);
  };

  const handleAddQueue = async () => {
    if (!patientId) {
      alert("Masukkan ID pasien!");
      return;
    }
    await addQueue({ patient_id: patientId });
    setPatientId("");
    fetchQueue();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateQueueStatus(id, { status });
    fetchQueue();
  };

  const handleDeleteQueue = async (id) => {
    if (window.confirm("Yakin ingin menghapus antrian ini?")) {
      await deleteQueue(id);
      fetchQueue();
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Antrian Pasien</h2>

      {/* Form Tambah Antrian */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Tambah ke Antrian</h3>
        <input
          type="number"
          placeholder="Masukkan ID Pasien"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4"
        />
        <button
          onClick={handleAddQueue}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Tambah ke Antrian
        </button>
      </div>

      {/* Daftar Antrian */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Antrian Hari Ini</h3>
        {queue.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No. Antrian</th>
                <th className="p-2 border">ID Pasien</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="p-2 border">{item.nomor_antrian}</td>
                  <td className="p-2 border">{item.patient_id}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === "menunggu"
                          ? "bg-yellow-500"
                          : item.status === "dilayani"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 border flex justify-center space-x-2">
                    {item.status === "menunggu" && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, "dilayani")}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                      >
                        Layani
                      </button>
                    )}
                    {item.status === "dilayani" && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, "selesai")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                      >
                        Selesai
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteQueue(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">Tidak ada antrian hari ini.</p>
        )}
      </div>
    </div>
  );
};

export default Queue;
