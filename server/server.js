const app = require("./app");

// port
const port = process.env.PORT || 8000;

var date = new Date();
// listener
const server = app.listen(port, () =>
  console.log(
    "[" + date.toGMTString() + "] " + `Server is running on port ${port}`
  )
);
