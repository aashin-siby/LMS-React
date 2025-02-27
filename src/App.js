import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./services/AuthContest";
import UserRentals from "./components/UserRentals";

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manageBooks" element={<Admin />} />
          <Route path="/userRentals" element={<UserRentals />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
