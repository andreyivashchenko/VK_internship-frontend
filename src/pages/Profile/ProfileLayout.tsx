import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const ProfileLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
