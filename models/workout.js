const mongoose = require('mongoose');
const schema = mongoose.Schema

const workoutSchema = new schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
   exercises: [{
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
    weight: {
       type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    }
   }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
