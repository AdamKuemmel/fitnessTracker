//require mongoose and schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//new schema--day --exercises -type, name, duartion, weight, reps, sets, distance
const workoutSchema = new Schema({
  day: { type: Date, default: Date.now },

  exercises: [
    {
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number,
    },
  ],
});

//mongoose model variable
const Workout = mongoose.model("Workout", workoutSchema);

//module export;
module.exports = Workout;
