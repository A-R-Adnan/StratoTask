import React, { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/config";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const SettingsModal = ({ user, onClose, onNameChanged }) => {
  const [newName, setNewName] = useState(user.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [photo, setPhoto] = useState(user.photoURL || "");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const modalRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Trap focus inside the modal for accessibility
  useEffect(() => {
    const focusableElements =
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const modal = modalRef.current;
    if (!modal) return;

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    firstFocusableElement.focus();

    return () => {
      modal.removeEventListener("keydown", handleTab);
    };
  }, []);

  // Dark mode toggle handler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newMode ? "dark" : "light");
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Handle profile photo file selection & upload preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);

    setPhotoUploading(true);
    setTimeout(async () => {
      try {
        await updateProfile(auth.currentUser, { photoURL: reader.result });
        setPhoto(reader.result);
      } catch (error) {
        alert("Error updating photo: " + error.message);
      } finally {
        setPhotoUploading(false);
      }
    }, 1500);
  };

  const handleNameChange = async () => {
    if (!newName.trim()) return;
    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      if (onNameChanged) onNameChanged(newName.trim());
      onClose();
    } catch (error) {
      alert("Error updating name: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Password change handler with re-authentication
  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (!currentPassword || !newPassword) {
      setPasswordError("Please enter current and new passwords.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    setIsSaving(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Fully implemented logout handler with loading state, modal close, and redirect
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth.signOut();
      onClose(); // Close modal immediately after logout
      window.location.href = "/auth?mode=login"; // Redirect to login page
    } catch (error) {
      alert("Error logging out: " + error.message);
      setIsLoggingOut(false);
    }
  };

  // Sync dark mode class on mount/change
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-scaleIn
        overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="settings-title"
          className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100 select-none"
        >
          Settings
        </h2>

        {/* Profile Section */}
        <section className="mb-8" aria-labelledby="profile-section-title">
          <h3
            id="profile-section-title"
            className="text-xl font-semibold mb-5 text-gray-700 dark:text-gray-300"
          >
            Profile
          </h3>

          <div className="flex flex-col items-center mb-5">
            <img
              src={photo || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-indigo-500 dark:border-indigo-400"
            />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={photoUploading}
              className="hidden"
            />
            <label
              htmlFor="photo-upload"
              className={`cursor-pointer px-4 py-2 rounded-md border border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-400 font-medium
                hover:bg-indigo-100 dark:hover:bg-indigo-800 transition ${
                  photoUploading ? "opacity-50 pointer-events-none" : ""
                }`}
              title="Change profile picture"
            >
              {photoUploading ? "Uploading..." : "Change Profile Picture"}
            </label>
          </div>

          <p
            className="text-gray-600 dark:text-gray-400 mb-3 truncate cursor-default select-text"
            title={user.email}
          >
            {user.email}
          </p>

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
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition shadow-sm mb-4"
            disabled={isSaving}
            aria-describedby="saveNameHelp"
            autoComplete="name"
          />
          <button
            onClick={handleNameChange}
            disabled={newName.trim() === "" || isSaving}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-shadow ${
              newName.trim() === "" || isSaving
                ? "bg-indigo-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            } focus:outline-none focus:ring-4 focus:ring-indigo-400`}
            type="button"
            aria-live="polite"
            aria-busy={isSaving}
            aria-describedby="saveNameHelp"
          >
            {isSaving ? "Saving…" : "Save Name"}
          </button>
          <p
            id="saveNameHelp"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            aria-live="polite"
          >
            Set your display name as it will appear in your board.
          </p>
        </section>

        {/* Password Section */}
        <section className="mb-8" aria-labelledby="password-section-title">
          <h3
            id="password-section-title"
            className="text-xl font-semibold mb-5 text-gray-700 dark:text-gray-300"
          >
            Change Password
          </h3>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mb-3 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition shadow-sm"
            autoComplete="current-password"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-3 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition shadow-sm"
            autoComplete="new-password"
          />

          {passwordError && (
            <p className="text-red-600 mb-3 text-sm" role="alert">
              {passwordError}
            </p>
          )}
          {passwordSuccess && (
            <p className="text-green-600 mb-3 text-sm" role="alert">
              {passwordSuccess}
            </p>
          )}

          <button
            onClick={handlePasswordChange}
            disabled={isSaving}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-shadow ${
              isSaving
                ? "bg-indigo-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            } focus:outline-none focus:ring-4 focus:ring-indigo-400`}
            type="button"
            aria-live="polite"
            aria-busy={isSaving}
          >
            {isSaving ? "Updating..." : "Update Password"}
          </button>
        </section>

        {/* Dark Mode Toggle */}
        <section
          className="mb-8 flex items-center justify-between"
          aria-label="Dark mode toggle"
        >
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 select-none">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={toggleDarkMode}
            className={`w-16 h-8 rounded-full relative focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
              ${darkMode ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"}`}
            type="button"
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <span
              className={`block w-7 h-7 bg-white rounded-full shadow transform transition-transform ${
                darkMode ? "translate-x-8" : "translate-x-0"
              }`}
              aria-hidden="true"
            />
          </button>
        </section>

        <hr className="border-gray-200 dark:border-gray-700 mb-6" />

        {/* Logout Section */}
        <section aria-label="Logout section">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold
              hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none shadow-lg transition
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold
              hover:bg-gray-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow transition"
          >
            Close
          </button>
        </section>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SettingsModal;