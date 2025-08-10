import axios from "axios";
import { auth } from "../firebase/config";

const API_BASE_URL = "http://localhost:5000/api"; // Update if needed

async function getAuthToken() {
    const user = auth.currentUser; // Use imported auth!
    if (!user) throw new Error("User not logged in");
    return user.getIdToken();
  }
  

// List APIs
export async function getLists() {
  const token = await getAuthToken();
  const res = await axios.get(`${API_BASE_URL}/lists`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createList(name) {
  const token = await getAuthToken();
  const res = await axios.post(`${API_BASE_URL}/lists`, { name }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function renameList(listId, newName) {
  const token = await getAuthToken();
  const res = await axios.put(`${API_BASE_URL}/lists/${listId}`, { name: newName }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function removeList(listId) {
  const token = await getAuthToken();
  await axios.delete(`${API_BASE_URL}/lists/${listId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Task APIs
export async function createTask(listId, title) {
  const token = await getAuthToken();
  const res = await axios.post(`${API_BASE_URL}/lists/${listId}/tasks`, { title }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateTask(taskId, updates) {
  const token = await getAuthToken();
  const res = await axios.put(`${API_BASE_URL}/lists/tasks/${taskId}`, updates, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function removeTask(taskId) {
  const token = await getAuthToken();
  await axios.delete(`${API_BASE_URL}/lists/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Sync user after Firebase signup (call this after sign up succeeds)
export async function syncUserToBackend(user) {
  await axios.post(`${API_BASE_URL}/auth/sync-user`, {
    firebase_uid: user.uid,
    email: user.email,
    display_name: user.displayName
  });
}
