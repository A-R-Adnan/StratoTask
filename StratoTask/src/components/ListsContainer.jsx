import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import {
  getLists,
  createList,
  createTask,
  updateTask,
  removeTask,
  removeList,
  renameList
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
          tasks: l.tasks.map((t) => (t.id === taskId ? updatedTask : t))
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
    <section className="overflow-x-auto flex gap-10 py-6 px-6">
      {loading && <p>Loading lists...</p>}
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
      <div className="w-72 h-min p-6 bg-white rounded-3xl shadow-xl">
        <label htmlFor="new-list-name">Add New List</label>
        <input
          id="new-list-name"
          type="text"
          placeholder="List name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={addList}>Add List</button>
      </div>
    </section>
  );
};

export default ListsContainer;
