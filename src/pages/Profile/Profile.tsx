import React, { FC, useEffect } from "react";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getMe } from "../../redux/slices/userSlice";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getMe());
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return <div style={{ color: "white" }}>home</div>;
};

export default Profile;
