const express = require('express');
const { route } = require('express/lib/application');
const {verifyToken , verifyTokenAndAuthorisation,verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {
    GetAllUsers ,DeleteUser,UpdateUser,GetAUser , GetUsersStats 
} = require("../controllers/User");
const {
    Register, Login
} = require('../controllers/auth');

const router = express.Router();

router
.route('/')
.post(Register)
.get(verifyTokenAndAdmin,GetAllUsers)

// get users stats
router
.route('/stats')
.get(verifyTokenAndAdmin,GetUsersStats)


router
.route('/Login')
.post(Login)

router
.route('/getAsingleUser/:id')
.get(verifyTokenAndAdmin,GetAUser)

router.route('/:id')
.put(verifyTokenAndAuthorisation,UpdateUser)
.delete(verifyTokenAndAuthorisation,DeleteUser)

module.exports = router;