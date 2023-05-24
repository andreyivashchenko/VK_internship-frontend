import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";

const Layout: FC = () => {
  return (
    <>
      {" "}
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
