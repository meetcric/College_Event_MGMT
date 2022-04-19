import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import "./newEvent.css";

export default function NewEvent() {
  const user = jwt_decode(localStorage.getItem("token"))["name"]; 
  console.log(user);
    // const user = "shreyank";
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("research-talk");
  const [maxParticipation, setMaxParticipation] = useState("100");
  const [allowedUserGroups, setAllowedUserGroups] = useState([]);
  const [datetime, setDateTime] = useState("");
  const [venue, setVenue] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [addedby, setAddedBy] = useState(user); //update it accordingly

  const data = [
    { label: "M.Tech", value: "M.Tech" },
    { label: "Integrated M.Tech", value: "IM.tech" },
    { label: "MS", value: "MS" },
    { label: "Ph.D", value: "Ph.D" },
    { label: "Digital Society", value: "DigiSoc"},
    { label: "All", value: "all"},
  ];

  async function handleSubmit(event) {
    event.preventDefault();

    const eventR = JSON.stringify({
      name: name,
      eventType: eventType,
      maxParticipation: maxParticipation,
      allowedUserGroups: allowedUserGroups,
      datetime: datetime,
      venue: venue,
      otherInfo: otherInfo,
      addedby: addedby
    });

    console.log(eventR);


    const res = await axios.post("http://localhost:8000/api/requestEvent", eventR, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "ok") {
      alert("Added");
    } else if (res.data.status === "error") {
      alert("error");
    }
  }

  const handleChange = (e) => {
    setAllowedUserGroups(Array.isArray(e) ? e.map(x => x.value) : []);
  }
  return (
    <div className="newEvent">
      <h1 className="addProductTitle">New Event</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dumb Charades" />
        </div>
        <div className="addProductItem">
          <label>Event Type</label>
          <select name="active" id="active" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="research-talk">Research talk</option>
            <option value="debate">Debate</option>
            <option value="seminar">Seminar</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Maximum Participation</label>
          <input type="text" value={maxParticipation} onChange={(e) => setMaxParticipation(e.target.value)} placeholder="123" />
        </div>
        <div className="addProductItem">
           <label>Allowed User Groups</label>
          { /*<select name="active" id="active" multiple  value={allowedUserGroups} onChange={(e) => setAllowedUserGroups([e.target.value])}>
            <option value="M.Tech">M.Tech</option>
            <option value="IM.tech">Integrated M.Tech</option>
            <option value="MS">MS</option>
            <option value="DigiSoc">Digital Society</option>
            <option value="Ph.D">Ph.D</option>
            <option value="Other">Other</option>
          </select> */}
                {/* <MultiSelect
                  options={options}
                  value={allowedUserGroups}
                  onChange={setAllowedUserGroups}
                  labelledBy="Select"
                /> */}
                <Select
                  className="dropdown"
                  placeholder="Select Option"
                  value={data.filter(obj => allowedUserGroups.includes(obj.value))} // set selected values
                  options={data} // set list of the data
                  onChange={handleChange} // assign onChange function
                  isMulti
                  isClearable
                />
        </div>
        <div className="addProductItem">
          <label>Date and Time</label>
          <input type="datetime-local" value={datetime} onChange={(e) => setDateTime(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Venue</label>
          <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Old Basket ball court" />
        </div>
        <div className="addProductItem">
          <label>OtheInfo</label>
          <input type="text" value={otherInfo} onChange={(e) => setOtherInfo(e.target.value)} />
        </div>         
        <input type="Submit" className="addProductButton" />
      </form>
    </div>
  );
}
