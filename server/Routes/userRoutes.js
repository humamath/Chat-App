const express = require('express');
const registeruser = require('../controllers/userControllers');
const router = express.Router()

router.route('/').post(registeruser)
router.route('/login').post()

module.exports = router;