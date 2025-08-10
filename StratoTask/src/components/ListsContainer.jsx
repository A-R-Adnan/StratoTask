import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import {
  getLists,
  createList,
  createTask,
  updateTask,
  removeTask,
  removeList,
  renameList,
} from "../utils/api";

const ListsContainer = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLists()
      .then(setLists)
      .catch(() => setLists([]))
      .finally(() => setLoading(false));
  }, []);

  const addList = async () => {
    if (!newListName.trim()) return;
    try {
      const added = await createList(newListName.trim());
      setLists([...lists, added]);
      setNewListName("");
    } catch (error) {
      alert("Failed to add list: " + error.message);
    }
  };

  const addTaskHandler = async (listId, taskTitle) => {
    if (!taskTitle.trim()) return;
    try {
      const task = await createTask(listId, taskTitle.trim());
      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, tasks: [...l.tasks, task] } : l))
      );
    } catch (error) {
      alert("Failed to add task: " + error.message);
    }
  };

  const removeTaskHandler = async (taskId) => {
    try {
      await removeTask(taskId);
      setLists((prev) =>
        prev.map((l) => ({ ...l, tasks: l.tasks.filter((t) => t.id !== taskId) }))
      );
    } catch (error) {
      alert("Failed to remove task: " + error.message);
    }
  };

  const changeTaskStatusHandler = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus });
      setLists((prev) =>
        prev.map((l) => ({
          ...l,
          tasks: l.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        }))
      );
    } catch (error) {
      alert("Failed to update task: " + error.message);
    }
  };

  const removeListHandler = async (listId) => {
    try {
      await removeList(listId);
      setLists((prev) => prev.filter((l) => l.id !== listId));
    } catch (error) {
      alert("Failed to remove list: " + error.message);
    }
  };

  const renameListHandler = async (listId, newName) => {
    try {
      const updated = await renameList(listId, newName.trim());
      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, name: updated.name } : l))
      );
    } catch (error) {
      alert("Failed to rename list: " + error.message);
    }
  };

  return (
    <section
      className="py-10 px-6 min-h-[70vh] bg-gradient-to-r from-indigo-50/80 via-blue-50/80 to-pink-100/70"
    >
      {loading && (
        <div className="flex items-center justify-center w-full h-40">
          <span className="animate-pulse text-indigo-400 font-semibold text-lg">
            Loading lists…
          </span>
        </div>
      )}

      {/* Responsive grid: 1-4 columns (mobile to xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-start">
        {!loading &&
          lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onAddTask={addTaskHandler}
              onRemoveTask={removeTaskHandler}
              onChangeTaskStatus={changeTaskStatusHandler}
              onRemoveList={removeListHandler}
              onRenameList={renameListHandler}
            />
          ))}

        {/* Add New List Card */}
        <div className="w-full h-min p-8 bg-white/90 rounded-3xl shadow-xl border border-indigo-200 flex flex-col gap-4 items-center justify-center self-start mt-3 hover:shadow-indigo-200/70 transition">
          <label
            htmlFor="new-list-name"
            className="font-bold text-indigo-700 text-lg mb-1 select-none"
          >
            + Add New List
          </label>
          <input
            id="new-list-name"
            type="text"
            placeholder="List name"
            className="border border-indigo-300 px-3 py-2 rounded-lg outline-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            autoComplete="off"
            aria-label="New list name"
          />
          <button
            onClick={addList}
            className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-800 transition disabled:bg-indigo-300"
            disabled={!newListName.trim()}
            aria-label="Add new list"
          >
            Add List
          </button>
        </div>
      </div>
    </section>
  );
};

export default ListsContainer;
