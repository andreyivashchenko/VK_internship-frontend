import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./SidebarLayout.module.scss";

const SidebarLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}></div>
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
