const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const embedController = require('./routes/embed')
const app = express();
const port = 3000;

app.use(bodyParser.json());

const username = "username"
const password = "password"
const cluster = "cluster"

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.tg1gjvo.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/embed', embedController);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
