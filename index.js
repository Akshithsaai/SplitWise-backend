const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoutes  = require('./routes/User');
const groupRoutes  = require('./routes/Group');
const friendRoutes = require('./routes/Friend');


const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});


app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/friends',friendRoutes);

app.listen(port,()=>{ 
    console.log(`your server is listening at ${port}`);
})


mongoose.connect(process.env.DB_ROOT, {dbName: "splitwise"})
.then(() => console.log("DB connected successfully"));