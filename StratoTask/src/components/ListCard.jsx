import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TaskCard from "./TaskCard";

const ListCard = ({
  list,
  onAddTask,
  onRemoveTask,
  onChangeTaskStatus,
  onRemoveList,
  onRenameList
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
    <div className="flex flex-col w-72 max-h-[80vh] rounded-3xl shadow-2xl bg-gradient-to-b from-indigo-100 via-indigo-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-indigo-300">
        {isEditingTitle ? (
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleRenameList}
            onKeyDown={(e) => e.key === "Enter" && handleRenameList()}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditingTitle(true)}>{list.name}</h2>
        )}
        <button onClick={() => onRemoveList(list.id)}>
          <FaTrash />
        </button>
      </div>
      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {list.tasks.length === 0 && <p>No tasks yet — add one below!</p>}
        {list.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onChangeStatus={onChangeTaskStatus}
            onRemove={onRemoveTask}
          />
        ))}
      </div>
      {/* Add Task */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Add new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" disabled={!newTaskTitle.trim()}>
          <FaPlus />
        </button>
      </form>
    </div>
  );
};

export default ListCard;
