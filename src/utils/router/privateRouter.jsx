import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "utils/hook";

import { useSelector, useDispatch } from "react-redux";
import { useRefreshMutation } from "store/slice/auth/authSlice";

import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "store/slice/auth";

const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [refreshToken] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userToken = await refreshToken().unwrap();
        dispatch(setCredentials({ ...userToken }));
        console.log("PrvivateRoute data: ", userToken);
      } catch (error) {
        console.log("In useAuth: ", error);
      }
    };
    if (!token && user) loadUser();
  }, [auth]);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/signin"} state={{ from: location.pathname }} replace />
  );
};
export default PrivateRoute;
