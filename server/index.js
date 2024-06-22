const express = require("express");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./mongoose");
const cors = require('cors');

const URL = require("./models/url");

const app = express();
const port = 8000;

connectToMongoDB("mongodb://0.0.0.0:27017/short-url")
.then(
    console.log("MongoDB Connected!")
)

app.use(cors());

app.use(express.json());

app.use("/url", urlRoute);



app.listen(port, ()=> console.log(`Server Started on Port: ${port}`));