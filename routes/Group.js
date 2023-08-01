const express = require('express');
const checkAuth = require('../middleware/CheckAuth');
const { createGroup, getGroupNameById, getGroupExpensesById, addExpense } = require('../controllers/Group.controller');
const router = express.Router();

router.post('/createGroup',checkAuth, createGroup)
router.get('/getGroupNameById/:id',checkAuth,getGroupNameById)
router.get('/getGroupExpensesById/:id',checkAuth,getGroupExpensesById)
router.post('/addExpense',checkAuth, addExpense)


module.exports = router