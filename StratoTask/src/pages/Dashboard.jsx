import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

import BoardHeader from "../components/BoardHeader";

import SettingsModal from "../components/SettingsModal";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState(currentUser?.displayName || "User");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setUserName(currentUser?.displayName || "User");
  }, [currentUser]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth.signOut();
      // Close modal or any open UI as needed
      setSettingsOpen(false);
      navigate("/auth?mode=login");
    } catch (error) {
      alert("Error logging out: " + error.message);
      setIsLoggingOut(false);
    }
  };

  const handleNameChanged = (newName) => {
    setUserName(newName);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
      <BoardHeader
        userName={userName}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      

      {settingsOpen && currentUser && (
        <SettingsModal
          user={currentUser}
          onClose={() => setSettingsOpen(false)}
          onNameChanged={handleNameChanged}
        />
      )}
    </main>
  );
};

export default Dashboard;