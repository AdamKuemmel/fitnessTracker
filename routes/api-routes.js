////reurire models and libraries
const db = require("../models");
const express = require("express");
const router = express.Router();

//get route for finding recent workout
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workoutsDB) => {
      console.log("here" + workoutsDB);

      //mapp all workouts
      const workouts = workoutsDB.map((workout) => {
        console.log({ workout });
        //reduce reutrns the sum of all elements in the exercise array
        const duration = workout.exercises.reduce((acc, next) => {
          return acc + next.duration;
        }, 0);

        return {
          //toObject to return data to JS object
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
  //finds a workout by id and updates
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
//post route to create a workout
router.post("/api/workouts", ({ body }, res) => {
  //create a workout
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//get route
router.get("/api/workouts/range", async (req, res) => {
  try {
    const allWorkouts = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);
    // const allWorkouts = await db.Workout.find({});
    console.log(allWorkouts);
    return res.json(allWorkouts);
  } catch (err) {
    res.status(400).json(err);
  }
});

//module export
module.exports = router;
