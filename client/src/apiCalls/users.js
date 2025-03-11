import React from "react";
import { axiosInstance } from ".";

const GetLoggedUser = async () => {
  try {
    const response = await axiosInstance.get("api/auth/detail");
    return response.data;
  } catch (error) {
    return error;
  }
};

export default GetLoggedUser;
