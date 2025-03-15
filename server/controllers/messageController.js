const messageModel = require("./../models/messageModel");
const asyncErrorHandler = require("./../controllers/asyncErrorHandler");
const Chat = require("./../models/chatModel");
exports.newMessage = asyncErrorHandler(async (req, res, next) => {
  const newMessage = new messageModel(req.body);

  // save in the database
  const savedMessage = await newMessage.save();

  const currentChat = await Chat.findOneAndUpdate(
    {
      _id: req.body.chatId,
    },
    {
      lastMessage: savedMessage._id,
      $inc: { unreadMessageCount: 1 },
    }
  );

  res.status(201).json({
    status: "SUCCESS",
    message: "MESSAGE SENT SUCCESSFULLY",
    data: savedMessage,
    currentChat,
  });

  // const currentChat = await Chat.findById(req.body.chatId);
  // currentChat.lastMessage = savedMessage._id;
  // await currentChat.save();
  //store the message
});
exports.getAllMessage = asyncErrorHandler(async (req, res, next) => {
  // search all message with the same chatid
  const allMessages = await messageModel
    .find({ chatId: req.params.chatId })
    .sort({ createdAt: 1 });
    

  res.status(200).json({
    status: "SUCCESS",
    allMessages,
  });

  // const currentChat = await Chat.findById(req.body.chatId);
  // currentChat.lastMessage = savedMessage._id;
  // await currentChat.save();
  //store the message
});
