import React, { useState } from "react";
import { FiEdit, FiSave, FiCamera } from "react-icons/fi";

const Profile = () => {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Pengguna");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "user@example.com");
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar") || "https://i.pravatar.cc/100");
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");

  const handleSave = () => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    if (newAvatar) {
      localStorage.setItem("userAvatar", newAvatar);
      setUserAvatar(newAvatar);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Profil Saya</h2>
      <div className="relative mx-auto w-28 h-28">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg object-cover"
        />
        {isEditing && (
          <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
            <FiCamera />
            <input
              type="text"
              placeholder="URL Avatar Baru"
              className="hidden"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
            />
          </label>
        )}
      </div>

      <div className="mt-4">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="p-2 border rounded-lg w-full mb-2"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>
        ) : (
          <div>
            <p className="text-xl font-semibold">{userName}</p>
            <p className="text-gray-500">{userEmail}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
          >
            <FiSave className="mr-2" /> Simpan
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
          >
            <FiEdit className="mr-2" /> Edit Profil
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
