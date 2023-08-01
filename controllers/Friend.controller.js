const mongoose = require("mongoose")
const Friend = require("../models/friends.model")
const User = require("../models/User.model")
// const createUser = (req,res) => {
//     const userDetails = new Friend({
//         _id:req.body._id,
//         expenses:[],
//         friends:[],
//     })
//     userDetails.save()
//     .then(data=>{
//         res.status(200).json({
//             id:data._id,
//             message:"User Added Successfully",
//         }) 
//     }) 
// }
const addFriends = (req,res) => {
    const currentUserDetails = req.body.currentUserDetails;
    const friendDetails = req.body.friendDetails;
    const friend  = new Friend({
        _id: new mongoose.Types.ObjectId(),
        expenses:[],
    })
    friend.save()
    .then(data =>{
        if(data){
            const addFriend = {
                friendExpenseId: data._id,
                friendId: friendDetails.id,
                friendName: friendDetails.name
            }
            User.updateOne({_id:currentUserDetails.id},{$push:{friends:addFriend}})
            .exec()
            .then(data =>{
                if(data){
                    addFriend.friendId = currentUserDetails.id,
                    addFriend.friendName = currentUserDetails.name
                    User.updateOne({_id:friendDetails.id},{$push:{friends:addFriend}})
                    .exec()
                    .then(data =>{
                        if(data){
                            res.status(200).json({
                                message : "added friend successfully", 
                                id: data._id
                            })
                        }
                    })
                }
            })
        }
    })
   
    
}
const getContacts = (req,res) => {
    User.find()
    .exec()
    .then((data) => {
        const userDetails = data.map((user) => {
            return {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id:user._id,
            }
        })
        res.status(200).json(userDetails) 
    })
}
const getFriends = (req,res) =>{
    User.findById({_id:req.params.id})
    .exec()
    .then((data) =>{
        if(data){
            console.log(data);
            res.status(200).json({
                friends:data.friends,
            })
        }
        else{
            res.status(404).json({
                message:"No friends found",
            })
        } 
    })
    .catch(err=>(console.log(err)))
}
const getFriendNameById = (req,res) =>{
    User.findById({_id:req.params.id})
    .exec()
    .then(data=>{
        if(data){
            console.log(data)
            res.status(200).json({
               name : data.firstName + ' ' + data.lastName,
               message:"success"
            })
        }
        else{
            res.status(500).json({
                message:"Not found"
            })
        }
    })
    .catch(err => console.log(err))
}
const getFriendExpensesById = (req,res) => {
    Friend.findById({_id:req.params.id})
    .exec()
    .then(data => {
        if(data) {
            res.status(200).json({
                expenses: data.expenses
            })
        }
    })
}
const addFriendExpense = (req,res) =>{
    const friendExpenseId =  req.body.id;
    const expense = {
        paidBy: req.body.paidBy,
        amount: req.body.amount,
        expenseName : req.body.expenseName,
        createdOn : new Date(),
    }
    Friend.updateOne({_id:friendExpenseId},{$push:{expenses:{$each:[expense],$position:0}}})
    .exec()
    .then(()=>{
        res.status(200).json({
            message:"Expense added successfully",
        })  
    })
    .catch(()=>{
        res.status(404).json({
            message:"Expense cannot be added",
        })
    })
 }


module.exports = {
    addFriends,
    getContacts,
    getFriends,
    getFriendNameById,
    getFriendExpensesById,
    addFriendExpense,
}

