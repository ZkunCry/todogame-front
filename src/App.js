import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

import Settings from "pages/settings/Settings";
import EditName from "pages/settings/EditName";
import ChangePassword from "pages/settings/ChangePassword";
import ChangeEmail from "pages/settings/ChangeEmail";
import ChooseTheme from "pages/settings/ChooseTheme";
import AuthRootComponent from "components/auth";
import PrivateRoute from "utils/router/privateRouter";
import { useDispatch } from "react-redux";
import { useRefreshMutation } from "store/slice/auth/authSlice";
import {
  selectCurrentToken,
  setCredentials,
  selectCurrentUser,
} from "store/slice/auth";
import { useSelector } from "react-redux";
import "App.css";
import "normalize.css";
import "null.css";
import NotFoundPage from "pages/NotFoundPage";

const App = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [refreshToken] = useRefreshMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect in App.js");
    const loadUser = async () => {
      if (!token && user) {
        try {
          const userToken = await refreshToken().unwrap();
          dispatch(setCredentials({ ...userToken }));
        } catch (error) {
          console.log("In useAuth: ", error);
        }
      } else return;
    };
    loadUser();
  }, [refreshToken, dispatch, token, user]);

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/settingsEditName" element={<EditName />}></Route>
          <Route path="/settingsChangeEmail" element={<ChangeEmail />}></Route>
          <Route
            path="/settingsChangePassword"
            element={<ChangePassword />}
          ></Route>
          <Route path="/settingsTheme" element={<ChooseTheme />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>

        <Route path="/auth/signup" element={<AuthRootComponent />}></Route>
        <Route path="/auth/signin" element={<AuthRootComponent />}></Route>
      </Routes>
    </div>
  );
};
//TODO: Решить с приватными роутами, какие должны быть приватными, какие нет

export default App;
