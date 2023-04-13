import React, { useEffect } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Cards from "./Cards";
import TopNavbar from "./TopNavbar";
import { useNavigate } from "react-router-dom";
import "./pages/Home.css";

export default function Trips() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate('/');
    }
  })

  return (
    <div>
      <TopNavbar/>
      <Navbar fade="fade-in" duration="1000" offset="200" />
      <Cards userID = {localStorage.getItem("id")}/>
    </div>
  );
}
