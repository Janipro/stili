import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export const Button = ({ children, type, onClick, button }) => {
  return (
    <Link to="/contact" className="btn">
      <button className={button} onClick={onClick} type={type}>
        {children}
      </button>
    </Link>
  );
};
