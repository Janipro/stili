import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import picture from "../../src/PicPlaceholder.png";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import Axios from "axios";
import "./ProfileInfo.css";
import locationIcon from "./location-icon.png";
import phone from "./phone.png";
import profile from "./profile2.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";

export default function ProfileInfo(props) {
  const [firstName, setFirstName] = useState("undefined");
  const [surname, setsurname] = useState("undefined");
  const [age, setAge] = useState("undefined");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const isAdmin = localStorage.getItem("admin");

  const adminExist = isAdmin === "true" ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h3>
        <b>{firstName}</b>
      </h3>
      <Tooltip disableFocusListener disableTouchListener title="Admin">
        <CheckCircleIcon color="primary" sx={{ ml: 1, mt: 0.5 }} />
      </Tooltip>
    </div>
  ) : (
    <h3>
      <b>{firstName}</b>
    </h3>
  );

  function validate() {
    console.log(age);
    console.log(age.length);
    return (
      firstName.length < 101 &&
      surname.length < 101 &&
      location.length < 101 &&
      firstName.length !== 0 &&
      surname.length !== 0 &&
      location.length !== 0 &&
      !isNaN(age) &&
      age !== "undefined" &&
      age !== "" &&
      parseInt(age) > 0 &&
      parseInt(age) < 120 &&
      (experience === "1" || experience === "2" || experience === "3") &&
      (location === "1" ||
        location === "2" ||
        location === "3" ||
        location === "4")
    );
  }

  function updateProfile() {
    Axios({
      method: "PUT",
      url: "/users/" + props.user.phoneNumber + "/",
      data: {
        firstName: firstName,
        surname: surname,
        phoneNumber: props.user.phoneNumber,
        age: age,
        experience: experience,
        location: location,
        password: props.user.password,
      },
    }).then((response) => {
      console.log(response);
    });
    changeText("Your changes has been saved.");
  }

  const changeText = (textinput) => setText(textinput);

  var locationMap = {
    "1": "Trondheim",
    "2": "Oslo",
    "3": "Stavanger",
    "4": "Bergen"
  };

  var experienceMap = {
    "1": "Easy",
    "2": "Mediocre",
    "3": "Veteran"
  };

  function fir() {
    if (firstName === "undefined") {
      setFirstName(props.user.firstName);
      return props.user.firstName;
    } else {
      return firstName;
    }
  }

  function sur() {
    if (surname === "undefined") {
      setsurname(props.user.surname);
      return props.user.surname;
    } else {
      return surname;
    }
  }

  function ag() {
    if (age === "undefined") {
      setAge(props.user.age);
      return props.user.age;
    } else {
      return age;
    }
  }

  function exp() {
    if (experience === "") {
      setExperience(props.user.experience);
      return props.user.experience;
    } else {
      return experience;
    }
  }

  function loca() {
    if (location === "") {
      setLocation(props.user.location);
      return props.user.location;
    } else {
      return location;
    }
  }

  if (props.user != null) {
    if (props.canEdit) {
      //render fields and buttons so user can edit instead of plain text if canEdit is true.
      return (
        <div>
          <>
            <TopNavbar />
            <Navbar />
            <div className="ProfilePage">
              <img src={profile} className="profilePic" alt=""></img>
              {adminExist}
              <div className="example-text-box">
                <Form>
                  <Form.Group size="lg" controlId="firstName">
                    <span width="20%" style={{ marginRight: "1.1vw" }}>
                      Firstname:{" "}
                    </span>
                    <Form.Control
                      autoFocus
                      type="firstName"
                      placeholder={props.user.firstName}
                      value={fir()}
                      onChange={(n) => setFirstName(n.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="surname">
                    <span width="20%" style={{ marginRight: "1.7vw" }}>
                      Surname:{" "}
                    </span>
                    <Form.Control
                      type="surname"
                      placeholder={props.user.surname}
                      value={sur()}
                      onChange={(n) => setsurname(n.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="age">
                    <span width="20%" style={{ marginRight: "4.3vw" }}>
                      Age:{" "}
                    </span>
                    <Form.Control
                      type="age"
                      placeholder={props.user.age}
                      value={ag()}
                      onChange={(a) => setAge(a.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="experience">
                    <span width="20%" style={{ marginRight: "0.8vw" }}>
                      Experience:{" "}
                    </span>
                    <Form.Select
                      aria-label="Default select example"
                      value={exp()}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="1">Easy</option>
                      <option value="2">Mediocre</option>
                      <option value="3">Veteran</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    float="left"
                    display="inline"
                    size="lg"
                    controlId="location"
                  >
                    <span width="20%" style={{ marginRight: "2.1vw" }}>
                      Location:{" "}
                    </span>
                    <Form.Select
                      aria-label="Default select example"
                      value={loca()}
                      width="70%"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="1">Trondheim</option>
                      <option value="2">Oslo</option>
                      <option value="3">Stavanger</option>
                      <option value="4">Bergen</option>
                    </Form.Select>
                  </Form.Group>
                  <Button
                    type="button"
                    className="editButton"
                    onClick={
                      validate()
                        ? () => updateProfile()
                        : () =>
                            changeText(
                              "Make sure all the changes are filled in correctly."
                            )
                    }
                  >
                    Save changes
                  </Button>
                </Form>
                <p className="errormsg">{text}</p>
              </div>
            </div>
          </>
        </div>
      );
    } else {
      return (
        <>
          <TopNavbar />
          <Navbar />
          <div className="about">
            <h1>
              {props.user.firstName} {props.user.surname}
            </h1>

            <div class="flex-container">
              <div>
                <img src={locationIcon} alt="Location" class="location"></img>
                <p>Location:</p>
                <br></br>
                {props.user.location}
              </div>
              <div>
                <img src={phone} alt="Phone" class="phone"></img>
                <p>Phone:</p>
                <br></br>
                <p>{props.user.phoneNumber}</p>
              </div>
              <div>
                <img src={experience} alt="Experience" class="experience"></img>
                Experience:
                <br></br>
                {experienceMap[props.user.experience]}
              </div>
              <div>
                <img src={age} alt="Age" class="age"></img>
                Age:
                <br></br>
                {props.user.age}
              </div>
            </div>
          </div>
        </>
      );
    }
  } else if (props.commercialUser != null) {
    console.log(props.commercialUser.location);
    console.log(typeof(props.commercialUser.location));
    console.log(locationMap["1"]);
    console.log(locationMap[props.commercialUser.location]);
    return (
      <>
        <TopNavbar />
        <Navbar />
        <div className="ProfilePage">
          <Image className="ProfilePic" src={picture}></Image>
          <h3>Commercial user</h3>
          <div className="example-text-box">
            <p>{props.commercialUser.orgName}</p>
            <p>{props.commercialUser.orgNumber}</p>
            <p>{locationMap[props.commercialUser.location]}</p>
          </div>
        </div>
      </>
    );
  } else {
    return <p>Loading..</p>;
  }
}
