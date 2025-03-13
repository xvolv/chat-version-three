const Chat = require("./../models/chatModel");
const asyncErrorHandler = require("./asyncErrorHandler");
const customeError = require("./../utils/customeError");

// exports.newChat = asyncErrorHandler(async (req, res, next) => {
//   // Log input for debugging
//   console.log("Request body:", req.body);

//   // Validate members
//   const { members } = req.body;
//   if (!members || !Array.isArray(members) || !members.length === 2) {
//     return next(new customeError("PROVIDE TWO USERS ONLY", 400));
//   }

//   // logger should be on member
//   // const currentUser = req.user._id.toString();
//   // if (members.includes(currentUser)) {
//   //   return next(new customeError("you should be a member of the chat", 403));
//   // }

//   // Create and save chat
//   const chat = new Chat({ members });
//   const savedChat = await chat.save();

//   // Send safe response
//   res.status(201).json({
//     status: "SUCCESS",
//     message: "Chat created",
//     chat: {
//       id: savedChat._id,
//       members: savedChat.members,
//       lastMessage: savedChat.lastMessage,
//       unreadMessage: savedChat.unreadMessage,
//     },
//   });
// });

exports.newChat = asyncErrorHandler(async (req, res, next) => {
  console.log("Request body:", req.body);

  const { members } = req.body;
  if (!members || !Array.isArray(members) || members.length !== 2) {
    // Fixed !length === 2
    return next(new customeError("PROVIDE TWO USERS ONLY", 400));
  }

  // Uncomment and fix this if you want—optional
  // const currentUser = req.user._id.toString();
  // if (!members.includes(currentUser)) { // Flip to !includes
  //   return next(new customeError("YOU MUST BE A MEMBER OF THE CHAT", 403));
  // }

  const chat = new Chat({ members });
  const savedChat = await chat.save();
  const populatedChat = await Chat.findById(savedChat._id).populate("members");

  res.status(201).json({
    status: "SUCCESS",
    message: "Chat created",
    chat: {
      id: populatedChat._id,
      members: populatedChat.members, // Now objects
      lastMessage: populatedChat.lastMessage,
      unreadMessage: populatedChat.unreadMessage,
    },
  });
});

exports.getAllChats = asyncErrorHandler(async (req, res, next) => {
  const chats = await Chat.find({ members: { $in: req.user._id } }).populate(
    "members"
  );

  if (!chats) {
    return next(new customeError("THERE IS NO CHAT", 404));
  }
  res.status(200).json({
    status: "SUCCESS",
    chats,
  });
});
