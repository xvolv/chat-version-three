import { axiosInstance } from ".";

export const GetLoggedUser = async () => {
  try {
    const response = await axiosInstance.get("api/auth/detail");
    return response.data;
  } catch (error) {
    return error;
  }
};
export const GetAllUser = async () => {
  try {
    const response = await axiosInstance.get("api/auth/users");
    // console.log(response.data.users);
    return response.data;
  } catch (error) {
    return error;
  }
};
