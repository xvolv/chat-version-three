import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessage } from "../../../apiCalls/message";
import { showLoader, hideLoader } from "./../../../redux/loaderSlice";
import toast from "react-hot-toast";
import moment from "moment";
import { useEffect, useState } from "react";
const ChatArea = () => {
  const [allMessage, setAllMessage] = useState([]);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const user = useSelector((state) => state.user.user);

  const selectedUser = selectedChat?.members.find((u) => u._id !== user._id);

  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
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

  const getMessages = async () => {
    try {
      dispatch(showLoader());
      const resData = await getAllMessage(selectedChat?._id);
      console.log(resData.allMessages, "this is resData.allMessages y'all");
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        setAllMessage(resData.allMessages);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getMessages();
  }, [selectedChat]);
  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {/* <!--RECEIVER DATA--> */}
            {selectedUser.firstName}
          </div>
          <div className="main-chat-area">
            {allMessage.map((msg, i) => {
              const isSenderMessage = msg.sender === user._id;

              return (
                <div
                  key={i}
                  className={"message-container"}
                  style={
                    isSenderMessage
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                >
                  <div>
                    <div
                      className={
                        isSenderMessage ? "send-message" : "received-message"
                      }
                    >
                      {msg.text}
                    </div>
                    <div
                      className={
                        isSenderMessage
                          ? "message-timestamp-sender"
                          : "message-timestamp"
                      }
                    >
                      {moment(msg.createdAt).format("hh:mm A")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="send-message-div">
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
