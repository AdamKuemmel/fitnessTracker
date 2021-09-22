//require librabres

const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const PORT = process.env.PORT || 3000;
const app = express();

//connect db ????
const databaseUrl = "fitTrack";
const collections = [""];
const db = mongojs(databaseUrl, collections);

//morgan middleware
app.use(logger("dev"));

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//require routes
app.use(require("./routes/html-routes"));
app.use(require("./routes/api-routes"));

//listen at port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
