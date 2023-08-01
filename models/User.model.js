const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    groups: {
        type: Array
    },
    friends:{
        type:Array
    }
})

module.exports = mongoose.model('Users',UserSchema)