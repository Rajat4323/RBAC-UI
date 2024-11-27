import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RolePage from "./pages/RolePage";
import UserPage from "./pages/UserPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/roles" element={<RolePage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
