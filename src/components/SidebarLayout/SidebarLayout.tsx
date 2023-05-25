import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./SidebarLayout.module.scss";
import Sidebar from "../Sidebar/Sidebar";

const SidebarLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
