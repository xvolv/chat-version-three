import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetLoggedUser from "../users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);
  // const { user } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    let resData;

    try {
      dispatch(showLoader());
      resData = await GetLoggedUser();
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        console.log(resData.user, resData);
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
