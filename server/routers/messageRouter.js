const express = require("express");
const messageController = require("./../controllers/messageController");
const protect = require("./../middlewares/authMiddleware");
const router = express.Router();
router.route("/new-message").post(protect, messageController.newMessage);
router
  .route("/chat-history/:chatId")
  .get(protect, messageController.getAllMessage);
module.exports = router;
