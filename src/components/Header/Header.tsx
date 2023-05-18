import React, { FC } from "react";
import styles from "./Header.module.scss";
import { logoutAuth } from "../../redux/slices/authSlice";
import { Link, useLocation } from "react-router-dom";
import logo from "../../asstes/VK_logo.png";
import { logoutUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

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
              <button>Зарегистрироваться</button>
            </Link>
          ) : path === "/registration" ? (
            <>
              <Link to="/login">
                <button>Войти</button>
              </Link>
            </>
          ) : (
            <button onClick={onClickLogout}>Выйти</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
