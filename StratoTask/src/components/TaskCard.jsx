import React, { useState, useRef, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const statusOptions = [
  { value: "To do", label: "To do", color: "bg-red-200 text-red-800" },
  { value: "In Progress", label: "In Progress", color: "bg-yellow-200 text-yellow-800" },
  { value: "Done", label: "Done", color: "bg-green-200 text-green-800" },
];

const TaskCard = ({ task, onChangeStatus, onRemove }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };
    if (selectOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectOpen]);

  const currentStatus = statusOptions.find((s) => s.value === task.status);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between gap-4">
      <span className="flex-1">{task.title}</span>
      <div className="relative" ref={selectRef}>
        <button
          onClick={() => setSelectOpen((prev) => !prev)}
          className={`text-sm py-1.5 px-3 rounded-full ${currentStatus.color}`}
        >
          {currentStatus.label}
        </button>
        {selectOpen && (
          <ul className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg z-50">
            {statusOptions.map(({ value, label, color }) => (
              <li
                key={value}
                onClick={() => {
                  onChangeStatus(task.id, value);
                  setSelectOpen(false);
                }}
                className={`cursor-pointer py-2 px-3 ${color}`}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => onRemove(task.id)} className="text-red-600">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default TaskCard;
