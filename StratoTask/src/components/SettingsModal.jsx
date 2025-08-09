import React, { useState, useEffect, useRef } from "react";
import { updateProfile } from "firebase/auth";

const SettingsModal = ({ user, onClose, onNameChanged, mode = "profile" }) => {
  const [newName, setNewName] = useState(user.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (mode === "changeName") {
      const nameInput = document.getElementById("nameInput");
      if (nameInput) nameInput.focus();
    }
  }, [mode]);

  const handleNameChange = async () => {
    if (!newName.trim()) return;
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName: newName.trim() });
      if (onNameChanged) onNameChanged(newName.trim());
      setFeedback("Name updated!");
      setTimeout(onClose, 800);
    } catch (error) {
      setFeedback("Error: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Click outside closes modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Settings
        </h2>

        {/* Profile section */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            Email: {user.email}
          </p>
        </div>

        {/* Change Name section */}
        <div className="mb-4">
          <label
            htmlFor="nameInput"
            className="block mb-2 text-gray-700 dark:text-gray-300 font-medium"
          >
            Change Name
          </label>
          <input
            id="nameInput"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full rounded-md border px-4 py-2"
            disabled={isSaving}
          />
          <button
            onClick={handleNameChange}
            disabled={!newName.trim() || isSaving}
            className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            {isSaving ? "Saving..." : "Save Name"}
          </button>
        </div>

        {feedback && (
          <p
            className={`text-sm ${
              feedback.startsWith("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {feedback}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 border rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
