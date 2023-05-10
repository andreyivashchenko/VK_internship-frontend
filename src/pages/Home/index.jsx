import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Authorized } from "../../slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Authorized());
  }, [dispatch]);
  return <div>home</div>;
};

export default Home;
