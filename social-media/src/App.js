import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Process from "./pages/Process";

import AlumCon from "./pages/Testimonial";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Dashboard from './pages/Dashboard';
import AuthInstagram from "../src/auth/AuthInstagram";
import { AssessmentProvider } from "./context/AssessmentContext";

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname.startsWith('/dashboard');
  return (
    <div>
      
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<Process />} />
        <Route path="/alumcon" element={<AlumCon />} />
        <Route path="/authpage" element={<AuthPage/>}/>
        <Route path="/auth/instagram" element={<AuthInstagram />} /> {/* Instagram auth route */}
        <Route
          path="/dashboard/*"
          element={
            <AssessmentProvider>
              <Dashboard />
            </AssessmentProvider>
          }
        />
        
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
      
      
    </div>
  );
};


export default App;
