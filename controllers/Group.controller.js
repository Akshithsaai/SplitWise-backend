const mongoose = require("mongoose")
const Group = require("../models/Group.model")

const createGroup = (req,res) => {
    const groupDetails = new Group({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        expenses:[],
        users:req.body.users,
    })
    groupDetails.save()
    .then(data=>{
        res.status(200).json({
            id:data._id,
        }) 
    }) 
}

const getGroupNameById = (req,res) =>{
    Group.findById({_id:req.params.id})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json({
                name:data.name,
            })
        }
    })
}
const getGroupExpensesById = (req,res) =>{
    console.log("hello");
    Group.findById({_id:req.params.id})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json({
                expenses:data.expenses,
                users:data.users,
            })
        }
    })
}
const addExpense = (req,res) =>{
    const groupId =  req.body.groupId;
    const expense = {
        paidBy: req.body.paidBy,
        amount: req.body.amount,
        expenseName : req.body.expenseName,
        createdOn : new Date(),
        borrowers : req.body.borrowers,
    }
    Group.updateOne({_id:groupId},{$push:{expenses:{$each:[expense],$position:0}}})
    .exec()
    .then(()=>{
        res.status(200).json({
            message:"Expense added successfully",
        })  
    })
 }
module.exports = {
    createGroup,
    getGroupNameById,
    getGroupExpensesById,
    addExpense,
}

