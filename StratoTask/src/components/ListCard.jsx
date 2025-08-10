import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import TaskCard from "./TaskCard";

const ListCard = ({
  list,
  onAddTask,
  onRemoveTask,
  onChangeTaskStatus,
  onRemoveList,
  onRenameList,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(list.name);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(list.id, newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleRenameList = () => {
    const trimmed = titleInput.trim();
    if (trimmed) {
      onRenameList(list.id, trimmed);
    } else {
      setTitleInput(list.name);
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="flex flex-col w-80 max-h-[82vh] bg-white/50 backdrop-blur-xl border border-indigo-200/70 rounded-3xl shadow-lg mb-4 transition-all duration-300 hover:shadow-indigo-200/80 hover:-translate-y-1 overflow-hidden group">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-indigo-200 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-3xl">
        {isEditingTitle ? (
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleRenameList}
            onKeyDown={(e) => e.key === "Enter" && handleRenameList()}
            autoFocus
            className="border border-indigo-300 rounded font-semibold text-lg w-full px-2 py-1 outline-indigo-500 bg-white focus:ring-2 focus:ring-indigo-400"
            aria-label="Edit list name"
          />
        ) : (
          <button
            onClick={() => setIsEditingTitle(true)}
            title="Rename list"
            className="font-bold text-lg text-indigo-800 truncate hover:underline flex items-center gap-2 focus:outline-none"
            aria-label={`List name: ${list.name}, click to rename`}
          >
            {list.name}
            <FaEdit className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          </button>
        )}
        <button
          onClick={() => onRemoveList(list.id)}
          className="flex-shrink-0 text-red-500 p-2 rounded-full hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          title="Delete List"
          aria-label="Delete list"
          type="button"
        >
          <FaTrash />
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
        {list.tasks.length === 0 && (
          <p className="text-indigo-300 text-center py-8 italic select-none">
            No tasks yet <span className="animate-pulse">—</span> add one below!
          </p>
        )}
        {list.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onChangeStatus={onChangeTaskStatus}
            onRemove={onRemoveTask}
          />
        ))}
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="flex items-center gap-2 px-5 py-3 border-t border-indigo-100 bg-white/70 backdrop-blur-sm rounded-b-3xl"
        aria-label="Add new task"
      >
        <input
          type="text"
          placeholder="Add new task…"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 border border-indigo-300 px-3 py-2 rounded-lg outline-indigo-400 focus:ring-2 focus:ring-indigo-500"
          autoComplete="off"
          aria-label="New task title"
        />
        <button
          type="submit"
          disabled={!newTaskTitle.trim()}
          className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-indigo-200 transition shadow focus:outline-none focus:ring-2 focus:ring-indigo-600"
          aria-label="Add Task"
        >
          <FaPlus />
        </button>
      </form>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scroll::-webkit-scrollbar { width: 7px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        `}
      </style>
    </div>
  );
};

export default ListCard;
