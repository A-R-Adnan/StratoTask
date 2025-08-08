import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
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
    if (newTaskTitle.trim() === "") return;
    onAddTask(list.id, newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const handleRenameList = () => {
    const trimmedTitle = titleInput.trim();
    if (trimmedTitle.length === 0) {
      setTitleInput(list.name); // reset if empty
    } else {
      onRenameList(list.id, trimmedTitle);
    }
    setIsEditingTitle(false);
  };

  return (
    <div
      className="flex flex-col w-72 max-h-[80vh] rounded-3xl shadow-2xl
        bg-gradient-to-b from-indigo-100 via-indigo-50 to-white
        hover:shadow-3xl transition-shadow duration-500 ease-in-out transform hover:-translate-y-2"
      role="region"
      aria-label={`${list.name} list`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 border-b border-indigo-300
          sticky top-0 bg-gradient-to-b from-indigo-200 via-indigo-150 to-indigo-100 rounded-t-3xl z-30"
      >
        {isEditingTitle ? (
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleRenameList}
            onKeyDown={(e) => e.key === "Enter" && handleRenameList()}
            autoFocus
            className="w-full text-lg font-bold border border-indigo-600 rounded-lg
              px-4 py-2 text-indigo-900 bg-indigo-100 placeholder-indigo-600
              focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:border-indigo-700 transition"
            aria-label="Edit list title"
          />
        ) : (
          <h2
            className="text-lg font-bold cursor-pointer truncate pr-3 text-indigo-900 select-text"
            title="Click to rename list"
            onClick={() => setIsEditingTitle(true)}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsEditingTitle(true);
            }}
            role="button"
            aria-pressed={isEditingTitle}
          >
            {list.name}
          </h2>
        )}
        <button
          onClick={() => onRemoveList(list.id)}
          aria-label={`Remove list ${list.name}`}
          className="text-red-700 hover:text-red-900 p-2 rounded-full transition
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1 shadow-lg"
          type="button"
          title="Delete list"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {/* Tasks container */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-5 bg-indigo-50/70 backdrop-blur-md
          scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 rounded-b-3xl"
      >
        {list.tasks.length === 0 && (
          <p className="text-indigo-400 italic text-center select-none text-sm md:text-base tracking-wide">
            No tasks yet — add one below!
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

      {/* Add Task input */}
      <form
        className="flex items-center border-t border-indigo-300 px-6 py-5 rounded-b-3xl
          bg-gradient-to-t from-white via-indigo-50 to-indigo-100 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        aria-label="Add new task to list"
      >
        <input
          type="text"
          placeholder="Add new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow rounded-3xl border border-indigo-400 px-5 py-3 text-indigo-900 placeholder-indigo-500 shadow-lg
            focus:outline-none focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition duration-300"
          aria-label="New task title"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={newTaskTitle.trim() === ""}
          className="bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed
            rounded-full p-4 flex items-center justify-center text-white shadow-xl transition-transform
            focus:outline-none focus:ring-4 focus:ring-indigo-600 active:scale-95"
          aria-label="Add task"
          title="Add task"
        >
          <FaPlus size={20} />
        </button>
      </form>
    </div>
  );
};

export default ListCard;
