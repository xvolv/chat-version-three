import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

const UserList = ({ searchKey }) => {
  const dispatch = useDispatch();
  const shortName = (user) => {
    return (
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    );
  };

  const {
    user: currentUser = null,
    allUsers = [],
    allChats = [],
  } = useSelector((state) => state.user) || {};

  // const startNewChat = async (searchedUserId) => {
  //   let resData;
  //   try {
  //     dispatch(showLoader());
  //     resData = await createNewChat([currentUser._id, searchedUserId]);
  //     dispatch(hideLoader());
  //     if (resData.status === "SUCCESS") {
  //       toast.success(resData.message);
  //       const newChat = resData.chat || resData;
  //       console.log("Static, new chat is:", newChat); // Check this
  //       const updateChat = [...allChats, newChat];
  //       dispatch(setAllChats(updateChat));
  //       dispatch(setSelectedChat(newChat));
  //       console.log("Static, set this chat:", newChat); // Confirm it’s sent
  //     }
  //   } catch (error) {
  //     dispatch(hideLoader());
  //     toast.error(resData?.message || "Failed to start chat");
  //     console.log(error, "Static, chat creation fucked up");
  //   }
  // };

  // const startNewChat = async (searchedUserId) => {
  //   let resData;
  //   try {
  //     dispatch(showLoader());
  //     resData = await createNewChat([currentUser._id, searchedUserId]);
  //     console.log("Static, raw API response:", resData); // What’s this?
  //     dispatch(hideLoader());
  //     if (resData.status === "SUCCESS") {
  //       toast.success(resData.message);
  //       const newChat = resData.chat || resData;
  //       console.log("Static, new chat is:", newChat);
  //       const updateChat = [...allChats, newChat];
  //       dispatch(setAllChats(updateChat));
  //       dispatch(setSelectedChat(newChat));
  //       console.log("Static, set this chat:", newChat);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoader());
  //     toast.error(resData?.message || "Failed to start chat");
  //     console.log(error, "Static, chat creation fucked up");
  //   }
  // };

  const startNewChat = async (searchedUserId) => {
    let resData;
    try {
      dispatch(showLoader());
      resData = await createNewChat([currentUser._id, searchedUserId]);
      console.log("Static, raw API response:", resData);
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        toast.success(resData.message);
        const newChat = {
          ...(resData.chat || resData),
          createdAt: resData.chat?.createdAt || new Date().toISOString(), // Fake it if missing
        };
        console.log("Static, new chat is:", newChat);
        const updateChat = [...allChats, newChat];
        dispatch(setAllChats(updateChat));
        dispatch(setSelectedChat(newChat));
        console.log("Static, set this chat:", newChat);
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
        chat.members.includes(currentUser._id) &&
        chat.members.includes(selectedUserId)
    );
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  return allUsers
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        (searchKey && fullName.includes(searchKey.toLowerCase())) ||
        allChats.some((chat) => chat.members?.includes(user._id))
      );
    })
    .map((user, index) => (
      <div
        onClick={() => {
          openChat(user._id);
        }}
        className="user-search-filter"
        key={user._id || index}
      >
        <div className="filtered-user">
          <div className="filter-user-display">
            {user.profile ? (
              <img
                src={user.profile}
                alt="profile picture"
                className="user-profile-image"
              />
            ) : (
              <div className="user-default-profile-pic">{shortName(user)}</div>
            )}
            <div className="filter-user-details">
              <div className="user-display-name">
                {user.firstName} {user.lastName}
              </div>
              <div className="user-display-email">{user.email}</div>
            </div>
            {!allChats.some(
              (chat) =>
                chat.members?.includes(currentUser?._id) &&
                chat.members?.includes(user._id)
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
