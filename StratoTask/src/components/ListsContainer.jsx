import React, { useState } from "react";
import ListCard from "./ListCard";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";

const ListsContainer = () => {
  // Sample initial lists data
  const [lists, setLists] = useState([
    {
      id: uuidv4(),
      name: "Today",
      tasks: [
        { id: uuidv4(), title: "Sample Task 1", status: "To do" },
        { id: uuidv4(), title: "Sample Task 2", status: "In Progress" },
      ],
    },
    {
      id: uuidv4(),
      name: "Tomorrow",
      tasks: [],
    },
  ]);

  const [newListName, setNewListName] = useState("");

  // Add a new list
  const addList = () => {
    const trimmedName = newListName.trim();
    if (!trimmedName) return;
    setLists((prev) => [
      ...prev,
      { id: uuidv4(), name: trimmedName, tasks: [] },
    ]);
    setNewListName("");
  };

  // Remove an existing list by its ID
  const removeList = (listId) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  // Rename an existing list by its ID
  const renameList = (listId, newName) => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, name: trimmedName } : list
      )
    );
  };

  // Add a task to a specific list by listId
  const addTask = (listId, taskTitle) => {
    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: uuidv4(), title: trimmedTitle, status: "To do" },
              ],
            }
          : list
      )
    );
  };

  // Remove a task by its taskId from any list
  const removeTask = (taskId) => {
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  // Change the status of a task by its taskId
  const changeTaskStatus = (taskId, newStatus) => {
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      }))
    );
  };

  return (
    <section
      aria-label="Task lists container"
      className="overflow-x-auto flex gap-10 py-6 px-6
        bg-gradient-to-r from-indigo-50 via-white to-pink-50
        scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100
        scroll-smooth touch-pan-x"
    >
      {lists.map((list) => (
        <ListCard
          key={list.id}
          list={list}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onChangeTaskStatus={changeTaskStatus}
          onRemoveList={removeList}
          onRenameList={renameList}
        />
      ))}

      {/* Add New List Card */}
      <div
        role="region"
        aria-label="Add new list section"
        className="w-72 h-min p-6 bg-white rounded-3xl shadow-xl flex flex-col justify-center
          border border-gray-300 hover:border-indigo-500 cursor-pointer transition-all
          hover:scale-105 focus-within:scale-105 focus-within:border-indigo-500 outline-none"
        tabIndex={0}
        onClick={addList}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            addList();
            e.preventDefault();
          }
        }}
      >
        <label
          htmlFor="new-list-name"
          className="text-gray-700 font-semibold mb-3 flex items-center gap-2 text-lg select-none"
        >
          <FaPlus className="text-indigo-600" />
          Add New List
        </label>
        <input
          id="new-list-name"
          type="text"
          placeholder="List name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" && newListName.trim() !== "") addList();
          }}
          className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          aria-label="New list name input"
        />
      </div>
    </section>
  );
};

export default ListsContainer;
