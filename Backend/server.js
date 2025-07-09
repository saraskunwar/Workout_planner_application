require('dotenv').config();
const express= require('express')
const mongoose = require('mongoose');
const workoutRouter = require('./routes/workouts.routes')
const userRoutes = require("./routes/user.routes")
const cors = require('cors')

const app = express();
app.use(cors());

// app.get('/', (req,res) => {
//     res.send("Hey Sonu ")
// })

// app.listen(4000, ()=> {
//     console.log("sonu is on 4000")
// })

app.use(express.json());



app.use('/api/workout',workoutRouter)

app.use('/api/users',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, ()=> 
        console.log("Database is connected and saru is on ",process.env.PORT ))
    })
    .catch(err =>
        console.error(err)
    );


