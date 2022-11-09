const express = require('express');
const { 
  accessChat,
  fetchChats,
  createGroupchat,
  renameGroup,
  addToGroup,
  removeFromGroup,
 } = require('../controllers/chatControllers')
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupchat);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addToGroup);

module.exports = router;