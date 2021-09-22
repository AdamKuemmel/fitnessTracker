//route all the differnet html pages here

//reuire libraries-- router, express- path
const path = require("path");
const express = require("express");
const router = express.Router();

//get route for the html page --index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// get route for the exercise page
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// get route for the stats page
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

///export router
module.exports = router;
