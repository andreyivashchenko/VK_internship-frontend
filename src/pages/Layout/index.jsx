import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../../components/Header/Header";

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;