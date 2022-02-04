const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

const dotenv = require('dotenv');


dotenv.config()

app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch(err => console.log(err))

app.use('/api',userRoute)
app.use('/api',authRoute)

app.listen(process.env.PORT || 5000,() => console.log("Backend server running"))