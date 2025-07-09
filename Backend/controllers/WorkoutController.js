const Workout= require('../model/workoutModel.js');
const mongoose = require('mongoose')

//get all workouts
const getWorkout = async(req, res) => {
    const user_id = req.user._id;

    const workout = await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json (workout)
}

//get workout by id
const getWorkoutById = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid id of the workout'})
    }
    const workout = await Workout.findById(id)

    if(!Workout) {
        res.status(404).json({msg:'Workout not found'})
    }
    res.status(200).json (workout)
}

// // Create a new workout
// const createWorkout = async(req, res) => {
//     const {title, load, reps}= req.body;
//     let emptyField=[]
//     if(!title)emptyField.push("title");
//     if(!reps) emptyField.push("reps");
//     if(!load) emptyField.push("load");
//     if(emptyField.length > 0) {
//         return res.status(400).json({error: "Please fill in all required fields", emptyField})
// }
//     try {
//         const workout = await Workout.create({title, load, reps})
//         res.status(200).json(workout);
        
//     } catch (error) {
//         res.status(400).json({error: err.message});
//     }
// }
const createWorkout = async (req, res) => {
    console.log("User from request:", req.user); // Debugging log

    const { title, load, reps } = req.body;
    let emptyField = [];

    if (!title) emptyField.push("title");
    if (!load) emptyField.push("load");
    if (!reps) emptyField.push("reps");

    if (emptyField.length > 0) {
        return res.status(400).json({ error: "Please fill in all required fields", emptyField });
    }

    try {
        if (!req.user_id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const user_id = req.user._id;
        console.log("User ID:", user_id); // Debugging log

        const workout = new Workout({ title, load, reps, user_id });
        console.log("Before Saving:", workout); // Check before saving

        await workout.save();
        
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
}
};

//update a workout by id
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'Invalid id of the workout' });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//delete a workout
const deleteWorkout = async (req, res) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid id of the workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({msg:'Invalid ID'})
    }
    res.status(200).json({msg:'Workout deleted'})
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkoutById,
    updateWorkout,
    deleteWorkout
    
}