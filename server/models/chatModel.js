const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ ref: "user", type: mongoose.Schema.Types.ObjectId }],
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    unreadMessage: {
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
