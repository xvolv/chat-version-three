import { useSelector } from "react-redux";

const ChatArea = () => {
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const user = useSelector((state) => state.user.user);
  console.log("Static, here’s your chat___*:", selectedChat); // What’s here?
  const selectedUser = selectedChat?.members.find((u) => u._id !== user._id);

  return (
    <>
      {selectedChat && (
        <div class="app-chat-area">
          <div class="app-chat-area-header">
            {/* <!--RECEIVER DATA--> */}
            {selectedUser.firstName}
          </div>
          <div>
            {/* <!--Chat Area--> */}
            CHAT AREA
          </div>
          <div>
            {/* <!--SEND MESSAGE--> */}
            SEND MESSAGE
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
