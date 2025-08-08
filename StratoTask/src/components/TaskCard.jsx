import React, { useState, useRef, useEffect } from "react";
import { FaTrashAlt, FaSpinner } from "react-icons/fa";

const statusOptions = [
  { value: "To do", label: "To do", color: "bg-red-200 text-red-800" },
  { value: "In Progress", label: "In Progress", color: "bg-yellow-200 text-yellow-800" },
  { value: "Done", label: "Done", color: "bg-green-200 text-green-800" },
];

const TaskCard = ({ task, onChangeStatus, onRemove }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };
    if (selectOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectOpen]);

  const currentStatus = statusOptions.find(s => s.value === task.status);

  // Accessibility: open dropdown on key press (Enter or Space) on badge
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectOpen(open => !open);
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between gap-4
                 hover:shadow-lg transition-shadow duration-300"
      role="listitem"
      aria-label={`Task: ${task.title}, status: ${task.status}`}
    >
      <span className="flex-1 text-gray-900 font-semibold truncate">{task.title}</span>

      {/* Status badge and dropdown container */}
      <div
        className="relative"
        ref={selectRef}
      >
        {/* Status badge */}
        <button
          type="button"
          onClick={() => setSelectOpen(open => !open)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={selectOpen}
          aria-label={`Change status of ${task.title}, current status ${task.status}`}
          className={`cursor-pointer select-none text-sm font-semibold py-1.5 px-3 rounded-full transition-colors 
                        focus:outline-none focus:ring-2 focus:ring-indigo-400 ${currentStatus.color}`}
          title={`Current status: ${task.status}. Click to change.`}
        >
          {currentStatus.label}
        </button>

        {/* Dropdown list */}
        {selectOpen && (
          <ul
            className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50"
            role="listbox"
            tabIndex={-1}
            aria-label={`Status options for task ${task.title}`}
          >
            {statusOptions.map(({ value, label, color }) => (
              <li
                key={value}
                role="option"
                aria-selected={value === task.status}
                tabIndex={0}
                onClick={() => {
                  onChangeStatus(task.id, value);
                  setSelectOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChangeStatus(task.id, value);
                    setSelectOpen(false);
                  }
                }}
                className={`cursor-pointer text-sm font-semibold py-2 px-3 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none rounded ${value === task.status ? "bg-indigo-100" : ""} ${color}`}
                title={label}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(task.id)}
        aria-label={`Remove task ${task.title}`}
        type="button"
        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 p-2 rounded-md"
        title="Remove task"
      >
        <FaTrashAlt className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TaskCard;
