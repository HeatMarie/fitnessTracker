const router = require('express').Router();
const path = require('path');
const Workout = require('../models/workout.js')


router.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
})

router.get('/exercise', async (req, res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

router.get("/stats", async (req, res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});


module.exports = router;