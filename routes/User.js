const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {USER_EXISTS} = require('../constants/Constants');
const { signUp, login, getContacts, addGroup, getGroupsById, getUserDetailsById, getUsersList } = require('../controllers/User.controller');
const checkAuth = require('../middleware/CheckAuth');

router.post('/signUp', signUp)
router.post('/login', login)
router.get('/getContacts',checkAuth, getContacts)
router.get('/getGroupsById/:id',checkAuth,getGroupsById)
router.get('/getUserDetailsById/:id',checkAuth,getUserDetailsById)
router.post('/addGroup',checkAuth,addGroup)
router.get('/getUsersList',checkAuth, getUsersList)

module.exports = router