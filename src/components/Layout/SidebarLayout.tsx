import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const SidebarLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
