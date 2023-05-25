import React, { FC } from "react";
import styles from "./Header.module.scss";
import { logoutAuth } from "../../redux/slices/authSlice";
import { Link, useLocation } from "react-router-dom";
import logo from "../../asstes/VK_logo.png";
import { logoutUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { CommonButton } from "../UI/Button/Button";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname: path } = useLocation();
  const onClickLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutAuth());
  };

  return (
    <div className={styles.header__wrapper}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__content}>
          <img src={logo} alt="" className={styles.header__logo} />
          <h1 className={styles.header__title}>ВКОННЕКТЕ</h1>
        </Link>
        <div className={styles.header__auth}>
          {path === "/login" ? (
            <Link to="/registration">
              <CommonButton size={"medium"}>Зарегистрироваться</CommonButton>
            </Link>
          ) : path === "/registration" ? (
            <Link to="/login">
              <CommonButton size={"medium"}>Войти</CommonButton>
            </Link>
          ) : (
            <CommonButton size={"medium"} onClick={onClickLogout}>
              Выйти
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
