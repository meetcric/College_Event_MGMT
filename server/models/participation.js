const mongoose = require("mongoose");

const Participation = new mongoose.Schema(
  {
    name: { type: String, required: true },
    event_id: {type: String, required: true},
    participation_details: {type: Array, required: false}
  },
  { collection: "event-participation" }
);

const model = mongoose.model("ParticipationData", Participation);

module.exports = model;
