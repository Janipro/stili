import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import mountain from './mountain-icon.webp';
import logout from './logout.png';

export default function Navbar(props) {

  function logOut() {
    localStorage.clear();
  }

  if (localStorage.getItem("id") != null) {
    return (
      <div className="navbar-container">
        <div
          data-aos={props.fade}
          data-aos-duration={props.duration}
          data-aos-offset={props.offset}
        >
          <nav className="navbar">
            <ul
            >
              <img src={mountain} alt="Mountain" class="mountain"></img>
              <li className="navbar-item">
                <Link
                  to="/home"
                  className="navbar-links"
                >
                  Explore
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile"
                  state={localStorage.getItem("id")} // profilenumber for my own profile, otherwise a phone number from database connected to the profilepic that is clicked on
                  className="navbar-links">
                  My profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/trips"
                  className="navbar-links"
                >
                  My trips
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/contact"
                  className="navbar-links"
                >
                  Contact us
                </Link>
              </li>
            </ul>
            
            <li className="logout"><Link
            to="/" className="logout-link"
            ><span onClick={logOut}><img src={logout} alt="Logout" class="logoutIcon"></img>Log out</span></Link></li> 
          </nav>
        </div>
      </div>
    );
  }
  
  else {
    return(
      <div className="navbar-container">
      <div
        data-aos={props.fade}
        data-aos-duration={props.duration}
        data-aos-offset={props.offset}
      >
        <nav className="navbar">
          <ul>
            <li className="navbar-item">
              <Link to="/" className="navbar-linksGuest">
                Log in here!
              </Link>
            </li>
            <li>
              <p style={{color: "black", margin: 0}}>OR</p>
            </li>
            <li className="navbar-item">
              <Link
                to="/register"
                className="navbar-linksGuest"
              >
                Sign up here!
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    );
  }
}
