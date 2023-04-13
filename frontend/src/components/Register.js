import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [surname, setsurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("1");
  const [location, setLocation] = useState("1");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      navigate('/home');
    }
  })

  function validate() {
    return (
      firstName.length < 101 &&
      surname.length < 101 &&
      location.length < 101 &&
      password.length < 101 &&
      firstName.length !== 0 &&
      surname.length !== 0 &&
      location.length !== 0 &&
      password.length !== 0 &&
      phoneNumber.length === 8 &&
      !isNaN(phoneNumber) &&
      age.length > 0 &&
      parseInt(age) < 120 &&
      age !== "0" &&
      !isNaN(age) &&
      (experience === "1" ||
      experience === "2" ||
      experience === "3") &&
      (location === "1" ||
      location === "2" ||
      location === "3" ||
      location === "4")
      );
  }

  function createUser(event) {
    getUser().then(response => {
      const currentUser = response.find(o => o.phoneNumber === phoneNumber);
      console.log(currentUser);
      if(typeof currentUser === "undefined") {
        Axios({
          method: "POST",
          url: "/users/",
          data: {
            firstName: firstName,
            surname: surname,
            phoneNumber: phoneNumber,
            age: age,
            experience: experience,
            location: location,
            password: password,
          },
        }).then((response) => {
          console.log(response);
        });
        localStorage.setItem("id", phoneNumber);
        navigate('/home');
      }
      else {
        changeText("The phone number is already in use.")
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

  const changeText = (textinput) => setText(textinput);

  return (
    <div className="box-form">
      <>
        <div className="left">
          <div className="overlay">
            <h1>Stili.</h1>
            <p className="joinFun">Registrer deg nå og bli med på morroa!</p>
          </div>
        </div>
        <div className="Register">
          <h5>Register</h5>
          <div className="information">
          <p>Already have an account? <Link to="/">Log in here</Link></p>
            or<br></br>
            <p><Link to="/commercialRegister">Sign up as a comercial organization</Link>.</p>
          </div>
          <Form>
            <Form.Group size="lg" controlId="firstName">
              <Form.Control
                autoFocus
                type="firstName"
                style={{width: "20vw"}}
                placeholder="First name"
                value={firstName}
                onChange={(n) => setFirstName(n.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="surname">
              <Form.Control
                type="surname"
                style={{width: "20vw"}}
                placeholder="Surname"
                value={surname}
                onChange={(n) => setsurname(n.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="phoneNumber">
              <Form.Control
                type="phoneNumber"
                style={{width: "20vw"}}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(p) => setPhoneNumber(p.target.value)}
              />
              <Form.Group size="lg" controlId="age">
                <Form.Control
                  type="age"
                  style={{width: "20vw"}}
                  placeholder="Age"
                  value={age}
                  onChange={(a) => setAge(a.target.value)}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group size="lg" controlId="experience">
            <Form.Select aria-label="Default select example" style={{width: "20vw"}} value={experience}
            onChange={(e) => setExperience(e.target.value)}>
              <option value="1">Easy</option>
              <option value="2">Mediocre</option>
              <option value="3">Veteran</option>
            </Form.Select>
            </Form.Group>
            <Form.Group size="lg" controlId="location">
            <Form.Select aria-label="Default select example" style={{width: "20vw"}} value={location}
            onChange={(e) => setLocation(e.target.value)}>
              <option value="1">Trondheim</option>
              <option value="2">Oslo</option>
              <option value="3">Stavanger</option>
              <option value="4">Bergen</option>
            </Form.Select>
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                type="password"
                style={{width: "20vw"}}
                placeholder="Password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
              />
            </Form.Group>
            <p className="errormsg">{text}</p>
            <Button
              size="lg"
              type="button"
              className="Button"
              onClick={
                validate()
                  ? () => createUser()
                  : () => changeText("Make sure all the fields are filled in correctly.")
              }
            >
              Register
            </Button>
          </Form>
        </div>
      </>
    </div>
  );
}
