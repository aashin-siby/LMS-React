import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./services/AuthContest";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
