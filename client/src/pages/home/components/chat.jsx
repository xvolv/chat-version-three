import { useSelector } from "react-redux";

const ChatArea = () => {
  const selectedChat = useSelector((state) => state.user.selectedChat);
  console.log("Static, here’s your chat:", selectedChat); // What’s here?
  return <div>{selectedChat && <h2>{selectedChat?.createdAt}</h2>}</div>;
};

export default ChatArea;
