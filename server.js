//require librabres

const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

//connect db
const databaseUrl = "workout";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

//log error if not connected
db.on("error", (error) => {
  console.log("Database Error:", error);
});

//morgan middleware
app.use(logger("dev"));

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//require routes
app.use(require("./routes/html-routes"));
app.use(require("./routes/api-routes"));

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//listen at port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
