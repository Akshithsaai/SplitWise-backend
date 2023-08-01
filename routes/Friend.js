const express = require('express');
const checkAuth = require('../middleware/CheckAuth');
const { getFriendNameById, addFriends, getFriends, getFriendExpensesById, addFriendExpense } = require('../controllers/Friend.controller');
const router = express.Router();

router.post('/addFriends',addFriends);
router.get('/getFriends/:id',checkAuth,getFriends); 
router.get('/getFriendNameById/:id',checkAuth,getFriendNameById);
router.get('/getFriendExpensesById/:id',checkAuth,getFriendExpensesById);
router.post('/addFriendExpense',addFriendExpense);

module.exports = router 