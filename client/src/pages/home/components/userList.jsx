import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

const UserList = ({ searchKey }) => {
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
                {user.firstName} {user.lastName}
              </div>
              <div className="user-display-email">{user.email}</div>
            </div>
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
