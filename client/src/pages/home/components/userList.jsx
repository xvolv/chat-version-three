import { useSelector } from "react-redux";

const UserList = ({ searchKey }) => {
  const allUsers = useSelector((state) => state.user.allUsers) || [];
  console.log("All Users  list--", allUsers);

  return allUsers.map((user) => {
    return (
      <div class="user-search-filter">
        <div class="filtered-user">
          <div class="filter-user-display">
            {/* <!-- <img src={user.profilePic} alt="Profile Pic" class="user-profile-image"> --> */}
            <div class="user-default-profile-pic">MJ</div>
            <div class="filter-user-details">
              <div class="user-display-name">Mery Jane</div>
              <div class="user-display-email">meryjane@gmail.com</div>
            </div>
            <div class="user-start-chat">
              <button class="user-start-chat-btn">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default UserList;
