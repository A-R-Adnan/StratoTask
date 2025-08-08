import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar always visible */}
        <Navbar />

        <div className="pt-16 min-h-screen">
          <Routes>
            {/* Home route: Navbar + HeroContent */}
            <Route path="/" element={<HeroContent />} />

            {/* Auth Form route: no hero content here */}
            <Route path="/auth" element={<AuthForm />} />

            {/* Protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
