const logger = require("./logger");
require("dotenv").config();
const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const EventR = require("./models/eventRequests");
const EventA = require("./models/approvedEvents");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Participation = require("./models/participation");
const { rawListeners } = require("./models/user.model");
const sendEmail = require("./utils/sendEmail");
// app
const app = express();

const url =
  "mongodb+srv://meet:meet@cluster0.ul47x.mongodb.net/project?retryWrites=true&w=majority";
// db
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("[" + date.toGMTString() + "] " + "DB CONNECTED"))
  .catch((err) =>
    logger.error("[" + date.toGMTString() + "] " + "DB CONNECTION ERROR", err)
  );

// middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

var date = new Date();

// test api
app.get("/test", (req, res) => {
  logger.info("[" + date.toGMTString() + "]" + " [/test] called");
  res.send({ message: "Test Api is working" });
  logger.info("[" + date.toGMTString() + "] " + "[/test] successfull");
});

//SignUP API
app.post("/api/register", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/register] called");

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      phoneno: req.body.phoneno,
      role: req.body.role,
      course: req.body.course,
    });
    logger.info("[" + date.toGMTString() + "] " + "[/api/register] successful");
    res.json({ status: "ok" });
  } catch (err) {
    logger.error("[" + date.toGMTString() + "] " + "[/api/register]" + err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

//Login API
app.post("/api/login", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/login] called");

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.json({ error: "Email not valid" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "secret123",
        { expiresIn: "10s" }
      );
      logger.info("[" + date.toGMTString() + "] " + "[/api/login] successful");
      return res.json({ status: "ok", user: token });
    } else {
      res.status(404).send();
      logger.info("[" + date.toGMTString() + "] " + "[/api/login] successful");
      return res.json({ error: "Invalid User Credentials", status: "404" });
    }
  } catch (err) {
    logger.error("[" + date.toGMTString() + "] " + "[/api/login]" + err);
  }
});

//EventManager APIs : To request event
app.post("/api/requestEvent", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/requestEvent] called");

  try {
    console.log(req.body);
    await EventR.create({
      name: req.body.name,
      eventtype: req.body.eventType,
      maxparticipation: req.body.maxParticipation,
      allowedusers: req.body.allowedUserGroups,
      datetime: req.body.datetime,
      venue: req.body.venue,
      otherinfo: req.body.otherInfo,
      addedby: req.body.addedby,
    });
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/requestEvent] successful"
    );
    res.json({ status: "ok" });
  } catch (err) {
    logger.error(
      "[" + date.toGMTString() + "] " + "[/api/requestEvent] " + err
    );
    res.json({ status: "error" });
  }
});

//EventManager: Unapproved events
app.get("/api/showPendingEvents/:user", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/requestEvent] called");

  var data;
  EventR.find({ addedby: req.params.user }, function (err, docs) {
    data = docs;
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/requestEvent] successful"
    );
    res.json(docs);
  });
});

//Admin: Show all pending events
app.get("/api/showAllPendingEvents/", async (req, res) => {
  logger.info(
    "[" + date.toGMTString() + "] " + "[/api/showAllPendingEvents] called"
  );

  var data;
  EventR.find({}, function (err, docs) {
    data = docs;
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/showAllPendingEvents] successful"
    );
    res.json(docs);
  });
});

//Admin: Approve events
app.post("/api/approveEvent/:id", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/approveEvent] called");

  var id = req.params.id; //EventR ID
  var event_request;

  event_request = await EventR.findOne({ _id: id });

  var p2 = {
    event_id: id, //EventR ID
    name: event_request["name"],
  };

  try {
    var new_event = new EventA(event_request);
    new_event._id = mongoose.Types.ObjectId(id);
    new_event.isNew = true;
    new_event.save();

    await Participation.create(p2);
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/approveEvent] successful"
    );
  } catch (err) {
    logger.error(
      "[" + date.toGMTString() + "] " + "[/api/approveEvent] " + err
    );
    res.status(400).send();
  }

  try {
    await EventR.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).send();
    console.log(err);
  }

  res.status(200).send();
});

//Admin: Reject Event [or] Delete pending Event
app.post("/api/rejectEvent/:id", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/rejectEvent] called");

  var id = req.params.id;
  try {
    await EventR.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).send();
  }

  logger.info(
    "[" + date.toGMTString() + "] " + "[/api/rejectEvent] successfull"
  );
  res.json({ status: "success" });
});

//EventManager: EventManager Approved events
app.get("/api/showAllEMEvents/:user", async (req, res) => {
  logger.info(
    "[" + date.toGMTString() + "] " + "[/api/showAllEMEvents] called"
  );

  var user = req.params.user;
  EventA.find({ addedby: user }, function (err, docs) {
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/showAllEMEvents] successfull"
    );
    res.json(docs);
  });
});

//Admin: All approved events
app.get("/api/allEvents", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/allEvents] called");

  EventA.find({}, function (err, docs) {
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/allEvents] successfull"
    );
    res.json(docs);
  });
});

//Admin: All users list
app.get("/api/allUserList", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/allUserList] called");

  User.find({}, function (err, docs) {
    data = docs;
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/allUserList] successfull"
    );
    res.json(docs);
  });
});

//Student: Show student events
app.get("/api/showStudentsEvents/:email", async (req, res) => {
  logger.info(
    "[" + date.toGMTString() + "] " + "[/api/showStudentsEvents] called"
  );

  const user_details = await User.findOne({ email: req.params.email });
  EventA.find(
    {
      maxparticipation: { $gt: 0 },
      allowedusers: { $in: user_details.course },
    },
    function (err, docs) {
      res.json(docs);
    }
  );
  logger.info(
    "[" + date.toGMTString() + "] " + "[/api/showStudentsEvents] successfull"
  );
});

//Student: participate in event
app.get("/api/participate/:eventid/:email", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/participate] called");

  try {
    User.findOneAndUpdate(
      { email: req.params.email },
      { $addToSet: { eventsp: req.params.eventid } },
      { returnNewDocument: true },
      function (err, result) {
        console.log(result);
      }
    );
    Participation.findOneAndUpdate(
      { event_id: req.params.eventid },
      { $addToSet: { participation_details: req.params.email } },
      { returnNewDocument: true },
      function (err, result) {
        console.log(req.params.eventid);
        console.log(result);
      }
    );
    logger.info(
      "[" + date.toGMTString() + "] " + "[/api/participate] successfull"
    );
    res.json({ status: "ok" });
  } catch (err) {
    logger.info("[" + date.toGMTString() + "] " + "[/api/participate] error");
    res.json({ status: "error" });
  }
});

app.get("/api/showStudentParticipatedEvents/:email", async (req, res) => {
  logger.info(
    "[" +
      date.toGMTString() +
      "] " +
      "[/api/showStudentParticipatedEvents] called"
  );

  (async () => {
    console.log("Un");
    var curr_event_id;
    var events = [];

    var docs = await User.findOne({
      email: req.params.email,
    });

    var eventids = docs.eventsp;
    console.log(eventids);

    for (var i = 0; i < eventids.length; i++) {
      curr_event_id = eventids[i];
      var docs2 = await EventA.findOne({ _id: eventids[i] });

      if (docs2 == null) {
        console.log(curr_event_id);
        await User.findOneAndUpdate(
          { email: req.params.email },
          { $pull: { eventsp: curr_event_id } }
        );
      } else {
        console.log("pushed");
        events.push(docs2);
      }
    }

    logger.info(
      "[" +
        date.toGMTString() +
        "] " +
        "[/api/showStudentParticipatedEvents] successfull"
    );
    res.send(events);
  })();
});

//DeleteUserByid
app.post("/api/deleteUser/:id", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/deleteUser] called");

  var id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).send();
    logger.info("[" + date.toGMTString() + "] " + "[/api/deleteUser] " + err);
  }
});

//Delete Approved Event
app.post("/api/deleteAprEvent/:id", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/deleteAprEvent] called");

  var id = req.params.id;
  try {
    await EventA.deleteOne({ _id: id });
    console.log("called");
  } catch (err) {
    logger.error(
      "[" + date.toGMTString() + "] " + "[/api/deleteAprEvent] " + err
    );
    res.status(400).send();
  }
});

app.post("/api/forgetpassword", async (req, res) => {
  logger.info("[" + date.toGMTString() + "] " + "[/api/forgetpassword] called");

  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const strpassword = Math.random().toString(36).substring(2, 8);
      const newPassword = await bcrypt.hash(strpassword, 10);
      User.updateOne(
        { email: req.body.email },
        { password: newPassword },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            var subject = "Reset Password";
            var text =
              "We received a request to reset your password,your new password is : " +
              strpassword;
            sendEmail(req.body.email, subject, text);
            res.send({ status: "ok" });
          }
        }
      );
      logger.info(
        "[" + date.toGMTString() + "] " + "[/api/forgetpassword] successfull"
      );
    } else {
      res.send({ status: "user not present" });
    }
  } catch (err) {
    logger.error(
      "[" + date.toGMTString() + "] " + "[/api/forgetpassword] error"
    );
    res.send({ status: "error" });
  }
});

module.exports = app;
