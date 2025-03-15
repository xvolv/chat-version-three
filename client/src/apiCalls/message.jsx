import { axiosInstance } from ".";

export const createNewMessage = async (message) => {
  try {
    const response = await axiosInstance.post(
      "api/message/new-message",
      message
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const getAllMessage = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `api/message/chat-history/${chatId}`
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
