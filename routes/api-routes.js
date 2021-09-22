////reurire models and libraries
const db = require("../models");
const express = require("express");
const router = express.Router();

//get route for finding all workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      const workouts = dbWorkouts.map((workout) => {
        console.log({ workout });
        const duration = workout.exercises.reduce((acc, next) => {
          return acc + next.duration;
        }, 0);

        return {
          totalDuration: duration,
          ...workout.toObject(),
        };
      });

      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//put route to update workouts by ID

//post route

//get route

//module export
module.exports = router;
