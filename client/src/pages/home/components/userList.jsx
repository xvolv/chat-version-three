import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";
// import moment from "moment";
const UserList = ({ searchKey }) => {
  // const getLastMessageTimeStamp = (userId) => {
  //   const chat = allChats.find((chat) =>
  //     chat.members.map((m) => m._id).includes(userId)
  //   );
  //   // we are here 10:18 44

  //   return chat && chat.lastMessage
  //     ? moment(chat.lastMessage.createdAt).format(" h:mm A")
  //     : "";
  // };

  const dispatch = useDispatch();

  const {
    user: currentUser = null,
    selectedChat = null,
    allUsers = [],
    allChats = [],
  } = useSelector((state) => state.user) || {};

  const shortName = (user) => {
    return (
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    );
  };

  const isSelectedChat = (user) => {
    return selectedChat?.members.some((m) => m._id === user._id) || false;
  };
  const getUnreadMessageCount = (userId) => {
    // loop over the chat
    const chat = allChats.find((chat) =>
      chat.members.map((u) => u._id).includes(userId)
    );
    if (
      chat &&
      chat.unreadMessageCount &&
      chat.lastMessage.sender !== currentUser._id
    ) {
      return (
        <div className="unread-message-counter">{chat.unreadMessageCount}</div>
      );
      // chat.unreadMessageCount;
    } else {
      return "";
    }
  };

  const startNewChat = async (searchedUserId) => {
    let resData;
    try {
      dispatch(showLoader());
      resData = await createNewChat([currentUser._id, searchedUserId]);
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        toast.success(resData.message);
        const newChat = resData.chat || resData;
        const updateChat = [...allChats, newChat];
        dispatch(setAllChats(updateChat));
        dispatch(setSelectedChat(newChat));
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(resData?.message || "Failed to start chat");
      console.log(error, "Static, chat creation fucked up");
    }
  };

  const openChat = (selectedUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.some((m) => m._id === currentUser._id) &&
        chat.members.some((m) => m._id === selectedUserId)
    );
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };
  const getLastMessage = (userId) => {
    const chat = allChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId)
    );
    // we are here 10:18 44
    const msgPrefix =
      chat?.lastMessage?.sender === currentUser?._id ? "you : " : "";
    return chat
      ? msgPrefix + (chat.lastMessage?.text?.substring(0, 25) || "")
      : "";
  };

  return allUsers
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const hasChat = allChats.some((chat) =>
        chat.members.some((m) => m._id === user._id)
      );
      const matchesSearch =
        searchKey && fullName.includes(searchKey.toLowerCase());
      return (
        user._id !== currentUser?._id && // No logger
        (hasChat || (matchesSearch && !searchKey === false)) // Chats or search hits
      );
    })
    .map((user, index) => (
      <div
        onClick={() => openChat(user._id)}
        className="user-search-filter"
        key={user._id || index}
      >
        <div
          className={isSelectedChat(user) ? "selected-user" : "filtered-user"}
        >
          <div className="filter-user-display">
            {user.profile ? (
              <img
                src={user.profile}
                alt="profile picture"
                className="user-profile-image"
              />
            ) : (
              <div
                className={
                  isSelectedChat(user)
                    ? "user-selected-avatar"
                    : "user-default-avatar"
                }
              >
                {shortName(user)}
              </div>
            )}
            <div className="filter-user-details">
              <div className="user-display-name">
                {user.firstName + " " + user.lastName}
              </div>

              <div className="user-display-email">
                {getLastMessage(user._id) || user.email}
              </div>
              {/* <div className="unread-message-counter"> */}
              {getUnreadMessageCount(user._id)}
              {/* </div> */}
            </div>
            {/* <div>{getLastMessageTimeStamp(user._id)}</div> */}
            {!allChats.some(
              (chat) =>
                chat.members.some((m) => m._id === currentUser?._id) &&
                chat.members.some((m) => m._id === user._id)
            ) && (
              <div className="user-start-chat">
                <button
                  className="user-start-chat-btn"
                  onClick={() => startNewChat(user._id)}
                >
                  Start Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
};

export default UserList;
