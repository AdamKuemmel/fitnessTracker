////reurire models and libraries
const db = require("../models");
const express = require("express");
const router = express.Router();

//get route for finding recent workout
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workoutsDB) => {
      console.log(workoutsDB);
      const workouts = workoutsDB.map((workout) => {
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

//put route to add exercise to workouts by ID,
router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//post route
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//get route
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//module export
module.exports = router;
