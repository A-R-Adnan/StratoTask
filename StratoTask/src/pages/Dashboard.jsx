import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import BoardHeader from "../components/BoardHeader";
import ListsContainer from "../components/ListsContainer";
import SettingsModal from "../components/SettingsModal";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(currentUser?.displayName || "User");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsMode, setSettingsMode] = useState("profile");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setUserName(currentUser?.displayName || "User");
  }, [currentUser]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setSettingsOpen(false);
      navigate("/");
    } catch (error) {
      alert("Error logging out: " + error.message);
      setIsLoggingOut(false);
    }
  };

  const handleNameChanged = (newName) => setUserName(newName);
  const handleProfileClick = () => { setSettingsMode("profile"); setSettingsOpen(true); };
  const handleChangeNameClick = () => { setSettingsMode("changeName"); setSettingsOpen(true); };

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-indigo-400/30 via-blue-200/60 to-pink-100/70 pb-12">
      {/* Blurred pastel blob background */}
      <div className="absolute -top-60 -left-32 w-[700px] h-[500px] bg-indigo-300 rounded-full opacity-50 blur-3xl" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[300px] bg-pink-200 rounded-full opacity-30 blur-3xl" />
      {/* Main Kanban Area */}
      <main className="relative z-10 flex flex-col min-h-screen">
        <BoardHeader
          userName={userName}
          onProfileClick={handleProfileClick}
          onChangeNameClick={handleChangeNameClick}
          onAddList={() => {}} // Provided by ListsContainer
          onSearchChange={() => {}}
          searchValue=""
          onClearSearch={() => {}}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
        <div className="flex-grow flex flex-col">
          <ListsContainer />
        </div>
        {settingsOpen && currentUser && (
          <SettingsModal
            user={currentUser}
            mode={settingsMode}
            onClose={() => setSettingsOpen(false)}
            onNameChanged={handleNameChanged}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
