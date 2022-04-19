const mongoose = require("mongoose");

const EventsApproved = new mongoose.Schema(
  {
    name: { type: String, required: true },
    eventtype: { type: String, required: true },
    maxparticipation: { type: String, required: true },
    allowedusers: { type: Array, required: true },
    datetime: { type: String, required: true },
    venue: { type: String, required: true },
    otherinfo: { type: String, required: false },
    addedby: { type: String, required: true },
  },
  { collection: "events-approved" }
);

const model = mongoose.model("EventsApproved", EventsApproved);

module.exports = model;
