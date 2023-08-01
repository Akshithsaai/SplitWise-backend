const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.get('/',(req,res)=>{
    res.send("Hello world")
})
const PORT = process.env.port || 8000;

mongoose.connect(process.env.DB_ROOT, {dbName: "splitwise"})
.then(() => console.log("DB connected successfully"));

const userRoutes  = require('./routes/User');
const groupRoutes  = require('./routes/Group');
const friendRoutes = require('./routes/Friend');


app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/friends',friendRoutes);


app.listen(PORT,()=>{ 
    console.log(`your server is listening at ${PORT}`);
})


