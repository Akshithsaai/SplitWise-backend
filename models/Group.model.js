const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    expenses:
    {
        type:Array,
    },
    users:
    {
        type:Array,
    }
})

module.exports = mongoose.model('Groups',GroupSchema)