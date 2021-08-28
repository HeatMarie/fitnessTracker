const router = require("express").Router();
const Workout = require("../models/workout.js");
const mongoose = require("mongoose");

router.post("/workouts", async ({ body }, res) => {
    try{
        const data = await Workout.create(body);
        res.json(data);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.put("/workouts/:id", async ({ body, params }, res) => {
    try {
        const data = await Workout.updateOne({
            "_id": params.id
        }, {
            // Using $addToSet adds to the array only if it is not already in the array
            $addToSet: { "exercises": [body] }
        })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

router.get("/workouts", async (req, res) => {
    try {
        const data = await Workout.aggregate([
            // displays the last workout by getting the last one from the db and limits to 1.
            { $sort: { _id: -1 } },
            { $limit: 1 },
            {
                $addFields: { totalDuration: {$sum: "$exercises.duration"} }
            }
        ]);
        res.json(data);
    } catch {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get("/workouts/range", async (req, res) => {
    try {
        const data = await Workout.aggregate([
            // get's 7 days of workout sorting by -1 get's last inpuut, limits the input to 7 and then sorts it in ascending order.
            { $sort: { _id: -1 } },
            { $limit: 7 },
            { $sort: {_id: 1} },
            {
                $addFields: { totalDuration: { $sum: "$exercises.duration" } }
            }
        ]);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;