const mongoose = require("mongoose");

const EventR = new mongoose.Schema(
  {
    name: { type: String, required: true },
    eventtype: { type: String, required: true},
    maxparticipation: { type: String, required: true },
    allowedusers: {type: Array, required:true},
    datetime: {type: String, required: true},
    venue: {type: String, required: true},
    otherinfo: {type: String, required: false}, 
    addedby: {type: String, required: true}
  },
  { collection: "events-requested" }
);

const model = mongoose.model("EventRequested", EventR);

module.exports = model;
