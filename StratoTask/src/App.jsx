

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroContent from "./components/HeroContent";
import HowItWorks from "./components/HowItWorks";
import Workflows from './components/Workflows';
import SeeWork from './components/SeeWork';
import PowerfulWays from './components/PowerfulWays';
import PriceSection from './components/PriceSection';
import SearchSection from "./components/SearchSection";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const HomePage = () => {
  return (
    <>
      <HeroContent />
      <HowItWorks />
      <Workflows />
      <SeeWork />
      <PowerfulWays />
      <PriceSection />
      <SearchSection />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar always visible */}
        <Navbar />

        {/* Apply padding top to avoid overlap with fixed navbar */}
        <div className="pt-16 min-h-screen">
          <Routes>
            {/* Home route renders combined home sections */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Form route: login/signup */}
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

            {/* Fallback redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
