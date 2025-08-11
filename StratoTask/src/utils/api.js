// src/utils/api.js
import axios from "axios";
import { auth } from "../firebase/config";

// Use Vite environment variable in production, fallback to localhost in dev
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Always get a fresh token before API calls
async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  // Force refresh to make sure token is valid
  const token = await user.getIdToken(true);
  console.log("🔑 Sending token:", token); // Debug
  return token;
}

// ---------------------- LIST APIs ---------------------- //

export async function getLists() {
  const token = await getAuthToken();
  const res = await axios.get(`${API_BASE_URL}/lists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createList(name) {
  const token = await getAuthToken();
  const res = await axios.post(
    `${API_BASE_URL}/lists`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function renameList(listId, newName) {
  const token = await getAuthToken();
  const res = await axios.put(
    `${API_BASE_URL}/lists/${listId}`,
    { name: newName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function removeList(listId) {
  const token = await getAuthToken();
  await axios.delete(`${API_BASE_URL}/lists/${listId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------------------- TASK APIs ---------------------- //

export async function createTask(listId, title) {
  const token = await getAuthToken();
  const res = await axios.post(
    `${API_BASE_URL}/lists/${listId}/tasks`,
    { title },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function updateTask(taskId, updates) {
  const token = await getAuthToken();
  const res = await axios.put(
    `${API_BASE_URL}/lists/tasks/${taskId}`,
    updates,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function removeTask(taskId) {
  const token = await getAuthToken();
  await axios.delete(`${API_BASE_URL}/lists/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---------------------- AUTH SYNC API ---------------------- //

export async function syncUserToBackend(user) {
  await axios.post(`${API_BASE_URL}/auth/sync-user`, {
    firebase_uid: user.uid,
    email: user.email,
    display_name: user.displayName,
  });
}
