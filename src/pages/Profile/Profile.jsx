import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Authorized } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Authorized());
  }, [dispatch]);
  return <div>home</div>;
};

export default Profile;
