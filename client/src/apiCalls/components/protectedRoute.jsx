import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetLoggedUser } from "../users";
import { GetAllUser } from "../users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser, setAllUsers, setAllChats } from "../../redux/userSlice";
import { getAllChats } from "../chat";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLoggedInUser = async () => {
    let resData;
    try {
      dispatch(showLoader());
      resData = await GetLoggedUser();
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        dispatch(setUser(resData.user));
      } else {
        toast.error(resData.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
      console.log(error);
    }
  };
  const getAllUserList = async () => {
    let resData;
    try {
      dispatch(showLoader());
      resData = await GetAllUser();
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        dispatch(setAllUsers(resData.users));
      } else {
        toast.error(resData.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
      console.log(error);
    }
  };

  const getAllUserChat = async () => {
    let resData;

    try {
      dispatch(showLoader());
      resData = await getAllChats();
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        dispatch(setAllChats(resData.chats));
      } else {
        toast.error(resData.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
      console.log(error);
    }
  };

  // const getAllUserChat = async () => {
  //   try {
  //     dispatch(showLoader());
  //     const resData = await getAllChats();
  //     dispatch(hideLoader());
  //     if (resData.status === "SUCCESS") {
  //       // Static, don’t fuck up my new chats, just add what’s missing
  //       dispatch(
  //         setAllChats((oldChats) => [
  //           ...oldChats,
  //           ...resData.chats.filter(
  //             (c) => !oldChats.some((oc) => oc._id === c._id)
  //           ),
  //         ])
  //       );
  //     } else {
  //       toast.error(resData.message);
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     dispatch(hideLoader());
  //     navigate("/login");
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
      getAllUserList();
      getAllUserChat();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
