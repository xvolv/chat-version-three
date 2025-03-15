import { axiosInstance } from ".";

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("api/chat/my-chats");


    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const createNewChat = async (members) => {
  try {
    const response = await axiosInstance.post("api/chat/create-new-chat", {
      members,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
