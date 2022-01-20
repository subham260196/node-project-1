require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')

const app = express();



// const userRouter = require("./router/router");
const userRouter = require("./router/router");

// app.use(express.json());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.bodyParser());

app.use("/app/controller", userRouter);

// app.get('/', function (req, res) {
//     res.send('Hello World');
//  })


app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on port :", process.env.APP_PORT);
});