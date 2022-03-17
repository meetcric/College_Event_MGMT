
const express = require("express");
const { json, urlencoded } = express;
const cors = require("cors");

// app
const app = express();

// db
// mongoose
// 	.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log("DB CONNECTED"))
// 	.catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// routes
app.get('/test',(req,res)=>{
    res.send({message : 'Test Api is working'})
})

// port
const port = process.env.PORT || 8000;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);