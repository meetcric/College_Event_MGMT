const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");

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
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

// port
const port = process.env.PORT || 8000;

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
