import React from "react";
import styles from "./Sidebar.module.scss";
import { CommonButton } from "../UI/Button/Button";
import { Link } from "react-router-dom";
import profile from "../../asstes/profileIcon.svg";
import friends from "../../asstes/friendsIcon.svg";
import news from "../../asstes/newsIcon.svg";
import messages from "../../asstes/messagesIcon.svg";

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.sidebar__item}>
          <Link to="/">
            <CommonButton image={profile} textPositionLeft={true}>
              Моя страница
            </CommonButton>
          </Link>
        </li>
        <li className={styles.sidebar__item}>
          <Link to="#">
            <CommonButton image={news} textPositionLeft={true}>
              Новости
            </CommonButton>
          </Link>
        </li>
        <li className={styles.sidebar__item}>
          <Link to="#">
            <CommonButton image={messages} textPositionLeft={true}>
              Сообщения
            </CommonButton>
          </Link>
        </li>
        <li className={styles.sidebar__item}>
          <Link to="#">
            <CommonButton image={friends} textPositionLeft={true}>
              Друзья
            </CommonButton>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
