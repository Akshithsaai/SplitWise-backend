const mongoose = require("mongoose")
const { comparePassword, encryptPassword} = require("../middleware/Crypt")
const User = require("../models/User.model")
const {USER_CREATED,USER_EXISTS, INVALID_PASSWORD, USER_DOES_NOT_EXISTS} = require('../constants/Constants');
const createToken = require("../middleware/Token");
const Friend = require("../models/friends.model")

const signUp =  (req,res) => {
    console.log(req.body)
    User.findOne({email: req.body.email})
    .exec()
    .then(async (data) => {
        if(data) {
            return res.status(400).json({
                message: USER_EXISTS
            })
        } else {
            const hash = await encryptPassword(req.body.password);
            console.log(hash)
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                groups :[],
                friends:[]
            })
            user.save() 
            .then(data =>{
                res.status(200).json({
                    message: USER_CREATED
                })
            })
        }
    })
    .catch(error=>{console.log(error)});
    
}

const login = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec()
    .then(async (data) =>{
        if(data){
            const isValidPassword = await comparePassword(req.body.password, data.password)
            if(isValidPassword) {
                const token = createToken({id: data._id, email: data.email})
                console.log(token);
                res.status(200).json({
                    token: token,
                    id: data._id
                })
            }
            else{ 
                res.status(400).json({
                    message : INVALID_PASSWORD 
                })
            }
        }
        else{
            res.status(400).json({
                message : USER_DOES_NOT_EXISTS
            })
        }
    })
    .catch(error=>{console.log(error +" "+ "hello")});
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
const addGroup = (req,res) =>{
   const userIds =  req.body.userDetails;
   let count = 0;
   userIds.forEach(id=>{
        User.updateOne({_id:id},{$push:{groups:req.body.groupId}})
        .exec()
        .then((data)=>{
            if(data) count++;
        })
        .then(()=>{
            if(count===userIds.length){
                res.status(200).json({
                    message:"Group created successfully",
                })
            }
        })
   })
}

const getGroupsById = (req,res)=>{
    User.findById({_id:req.params.id})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json({
                groupIds : data.groups,
            })
        }
    })
}
const getUserDetailsById = (req,res)=>{
    User.findById({_id:req.params.id})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json({
                firstName : data.firstName,
                lastName : data.lastName,
                id : data._id,
            })
        }
    })
}

const getUsersList = (req,res)=>{
    User.find()
    .exec()
    .then(data =>{
        if(data){
            const usersList = data.map(user => ({
                name : user.firstName + " " + user.lastName,
                id : user._id,
            }))
            res.status(200).json(usersList)
        }
    })
}

module.exports = {
    signUp,
    login,
    getContacts,
    addGroup,
    getGroupsById,
    getUserDetailsById,
    getUsersList,
}

