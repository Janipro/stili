import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") != null) {
      navigate('/home');
    }
  })

  function validate() {
    return (number.length === 8 && !isNaN(number));
  }

  function validateUser() {
    getUser().then(response => {
      const currentUser = response.find(o => o.phoneNumber === number);
      if (typeof currentUser === "undefined") {
        changeText("The phone number is not connected to an account.")
        return;
      }
      else {
        if(currentUser.password === password) {
          changeText("Logged in succesfully.");
          localStorage.setItem("id", currentUser.phoneNumber);
          localStorage.setItem("admin", currentUser.isAdmin)
          navigate('/home');
        }
        else {
          changeText("Incorrect phone number or password.")
        }
      }
    });
  }

  async function getUser() {
    try {
    const response = await Axios({
      method: "GET",
      url:"/users/",
      responseType:"json"
      })
    return response.data;
    }
    catch(error){
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }

  
  function validateOrg() {
    return (number.length === 9 && !isNaN(number));
  }

  function validateUserOrg() {
    getCommercialUser().then(response => {
      const currentUser = response.find(o => o.orgNumber === number);
      if (typeof currentUser === "undefined") {
        changeText("The organization number is not connected to an account.")
        return;
      }
      else {
        if(currentUser.password === password) {
          changeText("Logged in succesfully.");
          localStorage.setItem("id", currentUser.orgNumber);
          navigate('/home');
        }
        else {
          changeText("Incorrect organization number or password.")
        }
      }
    });
  }

  async function getCommercialUser() {
    try {
    const response = await Axios({
      method: "GET",
      url:"/commercialUsers/",
      responseType:"json"
      })
    return response.data;
    }
    catch(error){
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }

  const changeText = (textinput) => setText(textinput);

  function checkLogin() {
    if(validate()) {
      validateUser();
    }

    else if(validateOrg()){
      validateUserOrg();
    }

    else {
      changeText("Incorrect number or password.");
    }
  }

  return (
    <div className="box-form">
    <><div className="left">
      <div className="overlay">
        <h1>Stili.</h1>
        <p className="promo">Ekte turglede!</p>
        <p className="promo2"> Finn turer som passer for deg, og knytt vennskap for livet!</p>
      </div>
      </div>
      <div className="Login">
        <h5>Login</h5>
        <div className="information">
          <p>Don't have an account? <Link to="/register">Click here to register!</Link></p>
        </div>
          <Form>
            <Form.Group size="lg" controlId="number">
              <Form.Control
                autoFocus
                type="number"
                style={{width: "20vw"}}
                placeholder="Phone number/Org. number"
                value={number}
                onChange={(n) => setNumber(n.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                type="password"
                style={{width: "20vw"}}
                placeholder="Password"
                value={password}
                onChange={(p) => setPassword(p.target.value)} />
            </Form.Group>
            <Button
              block
              size="lg"
              type="button"
              className="Button"
              onClick={true
                ? () => {checkLogin()}
                : () => {changeText("An error has occured.")}
              }
            >
              Login
            </Button>
            <p className="errormsg">{text}</p>
          </Form>
        </div></>
    </div>
  );
}
