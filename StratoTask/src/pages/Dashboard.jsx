import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // use context hook instead of raw auth import

import BoardHeader from "../components/BoardHeader";
import ListsContainer from "../components/ListsContainer";
import SettingsModal from "../components/SettingsModal";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(currentUser?.displayName || "User");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsMode, setSettingsMode] = useState("profile"); // NEW: track which setting was clicked
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setUserName(currentUser?.displayName || "User");
  }, [currentUser]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
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

  // Handle opening modal from Profile click
  const handleProfileClick = () => {
    setSettingsMode("profile");
    setSettingsOpen(true);
  };

  // Handle opening modal from Change Name click
  const handleChangeNameClick = () => {
    setSettingsMode("changeName");
    setSettingsOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
      <BoardHeader
        userName={userName}
        onProfileClick={handleProfileClick}
        onChangeNameClick={handleChangeNameClick}
        onAddList={() => console.log("TODO: Add list handler")}
        onSearchChange={(val) => console.log("Search:", val)}
        searchValue=""
        onClearSearch={() => console.log("Clear search")}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      <div className="flex-grow overflow-auto mt-6">
        <ListsContainer />
      </div>

      {settingsOpen && currentUser && (
        <SettingsModal
          user={currentUser}
          mode={settingsMode} // Pass mode in case modal wants to show specific section
          onClose={() => setSettingsOpen(false)}
          onNameChanged={handleNameChanged}
        />
      )}
    </main>
  );
};

export default Dashboard;
