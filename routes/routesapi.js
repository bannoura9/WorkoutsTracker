const router = require("express").Router();
const workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
   workout
      .create({})
      .then((dbWorkout) => {
         res.json(dbWorkout);
      })
      .catch((err) => {
         res.status(400).json(err);
      });
});

router.put("/api/workouts/:id", (req, res) => {
    workout
      .findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
});

router.get("/api/workouts", (req, res) => {
  workout
    .aggregate([
       {
          $addFields: {
             totalDuration: {
                $sum: '$exercises.duration',
             },
          }
       },
    ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  workout
    .aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
    .limit(7)
    .sort({ _id: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


module.exports = router