const express = require("express");
const chatController = require("./../controllers/chatController");
const protect = require("./../middlewares/authMiddleware");
const router = express.Router();
router.route("/create-new-chat").post(protect, chatController.newChat);
router.route("/my-chats").get(protect, chatController.getAllChats);

module.exports = router;
