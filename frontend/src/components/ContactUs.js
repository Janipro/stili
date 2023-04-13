import React from "react";
import { Link } from "react-router-dom";
import location from './location-icon.png';
import phone from './phone.png';
import mail from './mail-icon.png';
import "./ContactUs.css";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import defaultImage from "./images/default_image.PNG";

export default function ContactUs() {
    var num = Math.floor(Math.random() * 15);
    function lols() {
        if(num === 3) {
            return (
            <div style={{display: "flex", justifyContent: "center", margin: "0px", padding: "0px"}}>
                <img src={defaultImage} alt="defaultImage" class="defaultImage" style={{height: "45vh", width: "43vh", margin: "0px", padding: "0px"}}/>
            </div>
            );
        }
        else {
            return (
            <div class="flex-container">
            <div>
                <img src={location} alt="Address" class="address"></img>
                <br></br>
                <h6>Address:</h6>
                <p>Høgskoleringen 1</p>
                <p>7491 Trondheim</p>

            </div>
            <div>
                <img src={phone} alt="Phone" class="phone"></img>
                <br></br>
                <h6>Phone:</h6>
                <p>97653787</p>
            </div>
            <div>
                <img src={mail} alt="Mail" class="mail"></img>
                <br></br>
                <h6>Mail:</h6>
                <p>stili@example.com</p>
            </div>
        </div>
        );
        }
    }

    return(
        <><TopNavbar />
        <Navbar fade="fade-in" duration="1000" offset="200" /><div className="content">
            <h1>Contact Information</h1>
            <h3>Have any questions? We would love to hear from you!</h3>
                {lols()}
            </div>
        </>
    );
}