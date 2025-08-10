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
    setFeedback("");
    try {
      await updateProfile(user, { displayName: newName.trim() });
      onNameChanged && onNameChanged(newName.trim());
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
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-md max-h-[80vh] overflow-auto"
      >
        <h2
          id="settings-title"
          className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 select-none"
        >
          Settings
        </h2>

        {/* Profile Section */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 select-text">
            Email: <span className="font-medium">{user.email}</span>
          </p>
        </div>

        {/* Change Name Section */}
        <div className="mb-4">
          <label
            htmlFor="nameInput"
            className="block mb-2 text-gray-700 dark:text-gray-300 font-medium select-none"
          >
            Change Name
          </label>
          <input
            id="nameInput"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            disabled={isSaving}
            aria-required="true"
            aria-label="New display name"
          />
          <button
            onClick={handleNameChange}
            disabled={!newName.trim() || isSaving}
            className={`mt-3 w-full py-2 rounded-md font-semibold text-white transition ${
              isSaving
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            aria-live="polite"
          >
            {isSaving ? "Saving..." : "Save Name"}
          </button>
        </div>

        {/* Feedback message */}
        {feedback && (
          <p
            className={`text-sm ${
              feedback.startsWith("Error") ? "text-red-600" : "text-green-600"
            } mb-4 select-none`}
            role="alert"
          >
            {feedback}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close settings"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
