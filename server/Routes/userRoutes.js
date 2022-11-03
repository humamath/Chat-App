const express = require('express');
const {registeruser, authUser } = require('../controllers/userControllers');
const router = express.Router();

router.route('/').post(registeruser);
router.post('/login',authUser);

module.exports = router;