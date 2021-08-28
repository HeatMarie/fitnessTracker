const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            type: {
                type: String,
                required: "Type of exercise must be selected"
            },

            name: {
                type: String,
                required: "Name of exercise is required"
            },
            
            duration: {
                type: Number,
                required: "The duration of the exercise is required"
            },

            weight: {
                type: Number,
            },

            reps: {
                type: Number,
            },
            
            sets: {
                type: Number,
            },

            distance: {
                type: Number,
            }
        }
    ],
    
    day: {
        type: Date,
        default: Date.now
    }

});

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout;