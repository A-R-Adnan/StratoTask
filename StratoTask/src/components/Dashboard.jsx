import React from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth?mode=login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-end items-center">
        <p className="mr-4 text-gray-700 font-semibold">
          {currentUser?.displayName || currentUser?.email}
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>
      <main className="mt-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard! Here you can build your Kanban boards.</p>
        {/* Future: Integrate boards/lists/cards here */}
      </main>
    </div>
  );
};

export default Dashboard;
