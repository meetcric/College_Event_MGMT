import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import "./newEvent.css";
import { useForm, Controller } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const data = [
    { label: "M.Tech", value: "M.Tech" },
    { label: "Integrated M.Tech", value: "IM.tech" },
    { label: "MS", value: "MS" },
    { label: "Ph.D", value: "Ph.D" },
    { label: "Digital Society", value: "DigiSoc" },
    { label: "All", value: "all" },
  ];

  async function formSubmit(event) {
    // event.preventDefault();
    console.log(errors.group);

    const eventR = JSON.stringify({
      name: name,
      eventType: eventType,
      maxParticipation: maxParticipation,
      allowedUserGroups: allowedUserGroups,
      datetime: datetime,
      venue: venue,
      otherInfo: otherInfo,
      addedby: addedby,
    });

    const res = await axios.post(
      "http://localhost:8000/api/requestEvent",
      eventR,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.status === "ok") {
      alert("Added");
    } else if (res.data.status === "error") {
      alert("error");
    }
  }

  const handleChange = (e) => {
    setAllowedUserGroups(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  return (
    <div className="newEvent">
      <h1 className="addProductTitle">New Event</h1>
      <form className="addProductForm" onSubmit={handleSubmit(formSubmit)}>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            name="fname"
            value={name}
            placeholder="Dumb Charades"
            {...register("fname", {
              required: true,
            })}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.fname?.type === "required" && <p>This field is required</p>}
        </div>
        <div className="addProductItem">
          <label>Event Type</label>
          <select
            name="active"
            id="active"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="research-talk">Research talk</option>
            <option value="debate">Debate</option>
            <option value="seminar">Seminar</option>
            <option value="cultural">Cultural</option>
            <option value="other"> Other</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Maximum Participation</label>
          <input
            type="text"
            name="maxParticipation"
            value={maxParticipation}
            {...register("maxParticipation", {
              required: true,
              pattern: /^[0-9]+$/,
            })}
            onChange={(e) => setMaxParticipation(e.target.value)}
          />
          {errors?.maxParticipation?.type === "required" && (
            <p>This field is required</p>
          )}
          {errors?.maxParticipation?.type === "pattern" && (
            <p>Please enter a Valid Number</p>
          )}
        </div>
        <div className="addProductItem">
          <label>Allowed User Groups</label>

          <Select
            className="dropdown"
            placeholder="Select Option"
            value={data.filter((obj) => allowedUserGroups.includes(obj.value))} // set selected values
            options={data} // set list of the data
            onChange={handleChange} // assign onChange function
            isMulti
            isClearable
          />
          {errors?.group?.type === "required" && <p>This field is required</p>}
        </div>
        <div className="addProductItem">
          <label>Date and Time</label>
          <input
            type="datetime-local"
            value={datetime}
            name="datetime"
            {...register("datetime", {
              required: true,
            })}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        {errors?.datetime?.type === "required" && <p>This field is required</p>}
        <div className="addProductItem">
          <label>Venue</label>
          <input
            type="text"
            value={venue}
            name="venue"
            placeholder="Old Basket ball court"
            {...register("venue", {
              required: true,
            })}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        {errors?.venue?.type === "required" && <p>This field is required</p>}
        <div className="addProductItem">
          <label>OtheInfo</label>
          <input
            type="text"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          />
        </div>

        <input type="Submit" className="addProductButton" />
      </form>
    </div>
  );
}
