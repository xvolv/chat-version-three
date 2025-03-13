import { useSelector } from "react-redux";

const UserList = ({ searchKey }) => {
  const shortName = (user) => {
    return (
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    );
  };

  const allUsers = useSelector((state) => state.user?.allUsers) || [];
  const allChats = useSelector((state) => state.user?.allChats) || []; // Fixed typo
  console.log("All Users list--", allUsers);
  console.log("All Chats--", allChats);

  return allUsers
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        (searchKey && fullName.includes(searchKey.toLowerCase())) || // Only filter by name if searchKey exists
        allChats.some((chat) => chat.members?.includes(user._id)) // Optional chaining for safety
      );
    })
    .map((user, index) => (
      <div className="user-search-filter" key={user._id || index}>
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
            {!allChats.find((chat) => chat.members?.includes(user._id)) && (
              <div className="user-start-chat">
                <button className="user-start-chat-btn">Start Chat</button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
};

export default UserList;
