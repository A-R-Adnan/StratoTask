import React, { useState, useRef, useEffect } from "react";
import {
  FaTrashAlt, FaChevronDown,
  FaCheckCircle, FaClock, FaClipboardList,
} from "react-icons/fa";

const statusOptions = [
  {
    value: "To do",
    label: "To do",
    color: "bg-red-100 text-red-700",
    progress: "bg-red-500",
    icon: <FaClipboardList aria-hidden="true" />,
  },
  {
    value: "In Progress",
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-800",
    progress: "bg-yellow-500",
    icon: <FaClock aria-hidden="true" />,
  },
  {
    value: "Done",
    label: "Done",
    color: "bg-green-100 text-green-700",
    progress: "bg-green-500",
    icon: <FaCheckCircle aria-hidden="true" />,
  },
];

const statusProgress = { "To do": 0, "In Progress": 50, "Done": 100 };

const TaskCard = ({ task, onChangeStatus, onRemove }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };
    if (selectOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectOpen]);

  const currentStatus = statusOptions.find((s) => s.value === task.status);

  return (
    <div
      className={`relative bg-white/80 rounded-2xl px-5 pt-4 pb-3 shadow-md border border-gray-100 flex items-center gap-4 group transition hover:shadow-indigo-200 animate-fadeIn`}
      tabIndex={0}
      aria-label={`Task: ${task.title}, status: ${task.status}`}
    >
      <span
        className={`flex-1 text-gray-800 font-semibold truncate text-base pr-2 ${
          task.status === "Done" ? "line-through text-gray-400" : ""
        }`}
        title={task.title}
      >
        {task.title}
      </span>
      <div className="relative" ref={selectRef}>
        <button
          onClick={() => setSelectOpen((v) => !v)}
          className={`flex items-center gap-2 text-sm py-1.5 px-3 rounded-full ${currentStatus.color} shadow border font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
          aria-haspopup="listbox"
          aria-expanded={selectOpen}
          aria-label="Change task status"
          type="button"
        >
          <span className="text-base">{currentStatus.icon}</span>
          {currentStatus.label}
          <FaChevronDown className="text-xs opacity-70" aria-hidden="true" />
        </button>
        {selectOpen && (
          <ul
            className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-xl z-50 animate-fadeIn overflow-hidden"
            role="listbox"
            tabIndex={-1}
          >
            {statusOptions.map(({ value, label, color, icon }) => (
              <li
                key={value}
                onClick={() => {
                  onChangeStatus(task.id, value);
                  setSelectOpen(false);
                }}
                className={`flex items-center gap-2 cursor-pointer py-2 px-3 ${color} hover:bg-indigo-50 transition`}
                role="option"
                aria-selected={currentStatus.value === value}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onChangeStatus(task.id, value);
                    setSelectOpen(false);
                  }
                }}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => onRemove(task.id)}
        className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
        title="Delete task"
        aria-label="Delete task"
        type="button"
      >
        <FaTrashAlt />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full px-3 pb-1 select-none">
        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${currentStatus.progress}`}
            style={{ width: statusProgress[task.status] + "%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
