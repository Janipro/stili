import React, { useState, useEffect } from "react";
import "./Cards.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Card(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventSize, setEventSize] = useState("");
  const [eventDistance, setEventDistance] = useState("");
  const [eventDifficulty, setEventDifficulty] = useState("1");
  const [organizer_id, setOrganizer_id] = useState("");
  const [eventLocation, setEventLocation] = useState("1");
  const [eventParticipants, setEventParticipants] = useState("");
  const [commercialOrganizer, setCommercialOrganizer] = useState("");
  const isAdmin = localStorage.getItem("admin");
  const phoneNumber = localStorage.getItem("id");
  const data1 = null;

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
    download();
  }, [data]);

  function download() {
    if(data === null) {
      getEvent().then((response) => {
        setData(response);
      });
    }

    if (data !== null) {
      var eventData = data.filter((ev) => {
        return ev.eventID === props.eventID;
      })[0];

      if(eventData.organizer_id !== null) {
        setOrganizer_id(eventData.organizer_id);
      }
      if(eventData.commercialOrganizer !== null) {
        setCommercialOrganizer(eventData.commercialOrganizer);
      }
      setEventName(eventData.eventName);
      setEventDate(eventData.eventDate);
      setEventDifficulty(eventData.eventDifficulty);
      setEventLocation(eventData.eventLocation);
      setEventDistance(eventData.eventDistance);
      setEventDescription(eventData.eventDescription);
      setEventSize(eventData.eventSize);
      setEventParticipants(eventData.eventParticipants);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    editEvent();
    window.location.reload(true);
  };

  const handleDelete = () => {
    Axios({
      method: "DELETE",
      url: "/events/" + props.eventID + "/",
      data: {
        eventID: props.eventID,
        eventName: eventName,
        eventDate: eventDate,
        eventDifficulty: eventDifficulty,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventSize: eventSize,
        eventDistance: eventDistance,
        organizer_id: organizer_id,
        eventParticipants: eventParticipants,
        commercialOrganizer: commercialOrganizer
      },
    }).then((response) => {
      console.log(response);
    });
    setData(null);
    window.location.reload(true);
  };

  async function getEvent() {
    try {
      const response = await Axios({
        method: "GET",
        url: "/events/",
        responseType: "json",
      });
      return response.data;
    } catch (error) {}
  }

  function editEvent() {
    Axios({
      method: "PUT",
      url: "/events/" + props.eventID + "/",
      data: {
        eventID: props.eventID,
        eventName: eventName,
        eventDate: eventDate,
        eventDifficulty: eventDifficulty,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventSize: eventSize,
        eventDistance: eventDistance,
        organizer_id: organizer_id,
        eventParticipants: eventParticipants,
        commercialOrganizer: commercialOrganizer
      },
    }).then((response) => {
      console.log(response);
    });
  }

  function joinEvent() {
    var numbers = eventParticipants;
    if (numbers.length > 0) {
      numbers = numbers + "," + phoneNumber;
    }
    else {
      numbers = phoneNumber;
    }
    Axios({
      method: "PUT",
      url: "/events/" + props.eventID + "/",
      data: {
        eventID: props.eventID,
        eventName: eventName,
        eventDate: eventDate,
        eventDifficulty: eventDifficulty,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventDistance: eventDistance,
        organizer_id: organizer_id,
        eventSize: eventSize,
        eventParticipants: numbers,
        commercialOrganizer: commercialOrganizer
      },
    }).then((response) => {
      console.log(response);
    });
    window.location.reload(true);
  }

  function leaveEvent() {
    var numbers = eventParticipants;
    if (numbers.includes(phoneNumber) && eventParticipants.length === 8) {
      numbers = "";
    }
    else {
      var leaveNumber = "," + phoneNumber;
      numbers = numbers.replace(leaveNumber,"");
    }
    Axios({
      method: "PUT",
      url: "/events/" + props.eventID + "/",
      data: {
        eventID: props.eventID,
        eventName: eventName,
        eventDate: eventDate,
        eventDifficulty: eventDifficulty,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventSize: eventSize,
        eventDistance: eventDistance,
        organizer_id: organizer_id,
        eventParticipants: numbers,
        commercialOrganizer: commercialOrganizer
      },
    }).then((response) => {
      console.log(response);
    });
    window.location.reload(true);
  }

  function leaveButton() {
  if(isAdmin !== "true" && eventParticipants.includes(phoneNumber) && 
  organizer_id !== phoneNumber && commercialOrganizer !== phoneNumber &&
  phoneNumber.length !== 9) {
    return(
    <div>
      <Button
        id="jbutton"
        variant="contained"
        size="small"
        color="error"
        onClick={leaveEvent}
      >
        Leave
      </Button>
    </div>
  )}
  else {
    return null;
  }
  }

  function joinButton() {
    if(isAdmin !== "true" && !eventParticipants.includes(phoneNumber) && 
    (eventParticipants.split(",").length !== props.size || eventParticipants.length === 0) &&
    organizer_id !== phoneNumber && commercialOrganizer !== phoneNumber && 
    phoneNumber.length !== 9) {
      return(
      <div>
        <Button
          id="jbutton"
          variant="contained"
          size="small"
          color="success"
          onClick={joinEvent}
        >
          Join
        </Button>
      </div>
    )}
    else{
      return null;
    }
  }
  function adminExist() {
    if(isAdmin === "true" || 
    commercialOrganizer === phoneNumber ||
    organizer_id === phoneNumber) {
      return(
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            id="button"
            variant="contained"
            size="small"
            color="info"
            onClick={handleClickOpen}
          >
            Edit event
          </Button>
        </div>
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
              value={eventName}
              onChange={(n) => setEventName(n.target.value)}
            />
            <TextField
              margin="normal"
              sx={{ mr: 7 }}
              id="date"
              type="date"
              variant="standard"
              value={eventDate.slice(0, 10)}
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
              value={eventDistance}
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
              value={eventDescription}
              onChange={(d) => setEventDescription(d.target.value)}
            />
            <TextField
              margin="normal"
              sx={{ mt: -0.5 }}
              label="Group size (excl. organizer)"
              type="number"
              fullWidth
              variant="standard"
              value={eventSize}
              onChange={(s) => setEventSize(s.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    )}
    else {
      return null;
    }
    }

  function participants() {
    if(eventParticipants.length === 0) {
      return "Participants: 0/" + props.size;
    }
    else {
      return "Participants: " + eventParticipants.split(",").length + "/" + props.size
    }
  }
  
  return (
    <div className={props.name}>
      <li className="card">
        <Link
          className="card_link"
          style={{ textDecoration: "none" }}
          to={props.path}
        >
          <figure className={props.wrapper} data-category={props.label}>
            <img src={props.src} alt="test" className="card_image"></img>
          </figure>
          <div className="card_info">
            <p className="card_title">{props.text}</p>
            <p className="card_description">Location: {props.location}</p>
            <p className="card_description">{props.description}</p>
            <p className="card_description">Distance: {props.distance}</p>
            <p className="card_size">
              {participants()}
            </p>
            {adminExist()}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {joinButton()}
              {leaveButton()}
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
}
