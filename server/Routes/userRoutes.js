const express = require('express');
const {registeruser, authUser , allUsers } = require('../controllers/userControllers');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registeruser).get(protect,allUsers);
router.post('/login',authUser);


module.exports = router;