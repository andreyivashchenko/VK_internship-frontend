import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import logo from "../../asstes/VK_logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.header__wrapper}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__content}>
          <img src={logo} alt="" className={styles.header__logo} />
          <h1 className={styles.header__title}>ВКОННЕКТЕ</h1>
        </Link>
        <div className={styles.header__auth}>
          {isAuth ? (
            <button onClick={onClickLogout}>Выйти</button>
          ) : (
            <>
              <Link to="/login">
                <button>Войти</button>
              </Link>
              <Link to="/registration">
                <button>Зарегистрироваться</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
