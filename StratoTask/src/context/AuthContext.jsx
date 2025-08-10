import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { syncUserToBackend } from "../utils/api";
import { auth } from "../firebase/config";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password, displayName) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCred.user, { displayName });
    }
    syncUserToBackend({
      uid: userCred.user.uid,
      email: userCred.user.email,
      displayName: displayName || userCred.user.displayName || "",
    }).catch(console.error);
    setCurrentUser({ ...userCred.user });
    return userCred.user;
  };

  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCred.user);
    return userCred.user;
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading: authLoading,
        signup,
        login,
        logout,
      }}
    >
      {!authLoading && children}
    </AuthContext.Provider>
  );
}
