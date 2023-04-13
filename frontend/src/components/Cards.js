import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Cards.css";
import oslo from "./images/oslo.jpg";
import trondheim from "./images/trondheim.jpg";
import bergen from "./images/bergen.jpg";
import stavanger from "./images/stavanger.jpg";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Cards(props) {
  const [data, setData] = useState([]);
  const [highestID, setHighestID] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventSize, setEventSize] = useState("");
  const [eventDistance, setEventDistance] = useState("");
  const [eventDifficulty, setEventDifficulty] = useState("1");
  const [eventLocation, setEventLocation] = useState("1");
  const [text, setText] = useState("");
  const pNumber = localStorage.getItem("id");

  const locations = [
    {
      value: "1",
      label: "Trondheim",
    },
    {
      value: "2",
      label: "Oslo",
    },
    {
      value: "3",
      label: "Stavanger",
    },
    {
      value: "4",
      label: "Bergen",
    },
  ];

  const difficulties = [
    {
      value: "1",
      label: "Easy",
    },
    {
      value: "2",
      label: "Mediocre",
    },
    {
      value: "3",
      label: "Veteran",
    },
  ];

  useEffect(() => {
    getEvents().then((response) => {
      const eventData = response;
      const highestEventID = Number(eventData[eventData.length - 1].eventID);
      if (highestEventID === 0) {
        return;
      }
      setHighestID(highestEventID);
      setData(eventData);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    createEvent().then(result => {
      if(result) {
        setOpen(false);
      window.location.reload(true);
      }
      else {
        changeText("Make sure all the fields are filled in correctly.");
      }
    });
  };

  async function getEvents() {
    try {
      const response = await Axios({
        method: "GET",
        url: "/events/",
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }

  function locationImage(loca) {
    switch(loca) {
      case "Trondheim":
        return trondheim;
      case "Oslo":
        return oslo;
      case "Stavanger":
        return stavanger;
      case "Bergen":
        return bergen;
      default:
        return trondheim;
    }
  }

  async function createEvent() {
    var ppNumber = pNumber;
    var pppNumber = "";
    var length = pNumber.length;

    if (length === 9) {
      ppNumber = "";
      pppNumber = pNumber;
    }

    if(eventName === "" || 
    eventDate === "" ||
    eventDescription === "" ||
    eventSize === "" ||
    eventDistance === "") {
      return false;
    }

    await Axios({
      method: "POST",
      url: "/events/",
      data: {
        eventID: (highestID + 1).toString(),
        eventName: eventName,
        eventDate: eventDate,
        eventDifficulty: eventDifficulty,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventDistance: eventDistance,
        organizer_id: ppNumber,
        eventSize: eventSize,
        eventParticipants: "",
        commercialOrganizer: pppNumber
      },
    }).catch((error) => {
        console.log(error);
    });
    return true;
  }

  const changeText = (textinput) => setText(textinput);

  const createEventButton =
  props.userID !== "" ? null : (
    <Button
      id="button"
      variant="contained"
      size="small"
      color="success"
      onClick={handleClickOpen}
    >
      Create Event
    </Button>
  );

  return (
    <div className="all">
      <div className="search-box"></div>
      <div className="cards">
        <div className="card_container">
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {createEventButton}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Event</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="normal"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(n) => setEventName(n.target.value)}
                />
                <TextField
                  margin="normal"
                  sx={{ mr: 7 }}
                  id="date"
                  type="date"
                  variant="standard"
                  onChange={(d) => setEventDate(d.target.value)}
                />
                <TextField
                  select
                  size="small"
                  label="Location"
                  margin="normal"
                  sx={{ mr: 7 }}
                  value={eventLocation}
                  onChange={(l) => setEventLocation(l.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {locations.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  select
                  size="small"
                  label="Difficulty"
                  margin="normal"
                  value={eventDifficulty}
                  onChange={(e) => setEventDifficulty(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {difficulties.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  margin="normal"
                  sx={{ mb: 2, mt: -0.5 }}
                  label="Distance in kilometres"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(d) => setEventDistance(d.target.value)}
                />

                <TextField
                  margin="normal"
                  label="Description and required equipment"
                  style={{ width: 552 }}
                  multiline
                  type="text"
                  maxRows={4}
                  variant="outlined"
                  onChange={(d) => setEventDescription(d.target.value)}
                />
                <TextField
                  margin="normal"
                  sx={{ mt: -0.5 }}
                  label="Group size (excl. organizer)"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(s) => setEventSize(s.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <p className="errormsg">{text}</p>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="card_wrapper">
            <ul className="card_items">
              {data
                .filter((val) => {
                  if(props.userID !== "") {
                    var org = "";
                    var corg = "";
                    if(val.organizer_id !== null) {
                      org = val.organizer_id;
                    }
                    if (val.commercialOrganizer !== null){
                      corg = val.commercialOrganizer;
                    }

                    if (
                      (search === "" && 
                        (val.eventParticipants.includes(props.userID) ||
                        org === props.userID ||
                        corg === props.userID)) ||
                      (search.length > 0 && val.eventName.toLowerCase().includes(search.toLowerCase()) &&
                        (val.eventParticipants.includes(props.userID) ||
                        org === props.userID ||
                        corg === props.userID) 
                        )
                    ) {
                      console.log(val);
                      return val;
                    }
                  }
                  else {
                    if (
                      search === "" ||
                      (search.length > 0 &&
                        val.eventName.toLowerCase().includes(search.toLowerCase()))
                    ) {
                      console.log(val);
                      return val;
                    }
                  }
                })
                .map((a) => {
                  return (
                    <li key={a.eventID}>
                      <Card
                        eventID={a.eventID}
                        name="card-body"
                        wrapper={"card_picture_wrapper-" + a.eventDifficulty}
                        src={locationImage(locations[a.eventLocation - 1].label)}
                        text={a.eventName}
                        location={locations[a.eventLocation - 1].label}
                        label={difficulties[a.eventDifficulty - 1].label}
                        path=""
                        description={a.eventDescription}
                        distance={a.eventDistance + " km"}
                        size={a.eventSize}
                        participants={a.eventParticipants}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
