const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    expenses:
    {
        type:Array,
    },
})

module.exports = mongoose.model('Friends',FriendsSchema)