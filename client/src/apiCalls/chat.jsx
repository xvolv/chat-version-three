import { axiosInstance } from ".";

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("api/chat/my-chats");
    console.log(
      "********************************************************************"
    );
    console.log(
      "list of chats wit the logger user chats res.data.chats--",
      response.data
    );
    console.log(
      "********************************************************************"
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
