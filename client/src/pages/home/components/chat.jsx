import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../../apiCalls/message";
import { showLoader, hideLoader } from "./../../../redux/loaderSlice";
import toast from "react-hot-toast";
import { useState } from "react";
const ChatArea = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const user = useSelector((state) => state.user.user);
  console.log("Static, here’s your chat___*:", selectedChat); // What’s here?
  const selectedUser = selectedChat?.members.find((u) => u._id !== user._id);
  const sendMessage = async () => {
    try {
      const newMessage = {
        chat: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const resData = await createNewMessage(newMessage);
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        setMessage("");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {/* <!--RECEIVER DATA--> */}
            {selectedUser.firstName}
          </div>
          <div className="main-chat-area">
            {/* <!--Chat Area--> */}
            CHAT AREA
          </div>
          <div class="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
