import React from "react";
import "./TopNavbar.css";
import { Link } from "react-router-dom";

export default function TopNavbar() {
    return (
        <nav className="top-navbar">
            <Link to ="/home" style={{ textDecoration: 'none' }}><li className="stili-topnav">Stili.</li></Link>
        </nav>
    );
  }
  