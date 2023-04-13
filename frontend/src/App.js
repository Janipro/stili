import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/pages/Home";
import Profile from "./components/Profile";
import CommercialRegister from "./components/CommercialRegister";
import ContactUs from './components/ContactUs';
import Trips from "./components/Trips";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/commercialRegister" element={<CommercialRegister/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/trips" element={<Trips/>} />
        </Routes>
      </Router>
    </div>
  );
}
