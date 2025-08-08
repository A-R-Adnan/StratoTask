import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext as a named export
export const AuthContext = createContext(null);

// AuthProvider component to wrap around your app and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {/* Render children only once loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);