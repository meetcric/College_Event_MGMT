const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const EventR = require("./models/eventRequests");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// routes
app.get("/test", (req, res) => {
  res.send({ message: "Test Api is working" });
});

//SignUP API
app.post("/api/register", async (req, res) => {
  // console.log(req.body);

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
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

//Login API
app.post("/api/login", async (req, res) => {
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
    console.log(req.body.email + "\n" + req.body.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "secret123"
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ error: "Invalid User Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});


//EventManager APIs
app.post("/api/requestEvent", async(req, res) => {
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
      addedby: req.body.addedby
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error"});
  }  
});

app.get("/api/showPendingEvents/:user", async(req, res) => {
    var data;
    EventR.find({"addedby":req.params.user}, function(err, docs) {
      data = docs;
      console.log(docs);
      res.send(docs);
    });
    // console.log(data);
    // console.log("\n\n\n\n\n\ndone\n\n\\n\n\n\n\n");
});

// port
const port = process.env.PORT || 8000;

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
