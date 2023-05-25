import React, { FC, useEffect } from "react";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getMe } from "../../redux/slices/userSlice";
import styles from "./Profile.module.scss";
import test from "../../asstes/testPhoto.jpg";
import marker from "../../asstes/markerIcon.svg";
import university from "../../asstes/universityIcon.svg";
import birthday from "../../asstes/birthdayIcon.svg";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (isAuth) {
      dispatch(getMe());
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profile__avatar}>
            <img src={test} alt="" className={styles.profile__avatar} />
          </div>
          <div className={styles.profile__info}>
            <h2 className={styles.profile__name}>
              {`${user?.firstname} ${user?.lastname}`}
            </h2>
            <ul className={styles.profile__description}>
              <li className={styles.description__item}>
                <img src={marker} alt="" className={styles.description__icon} />{" "}
                <h3 className={styles.description__data}>Город</h3>
              </li>
              <li className={styles.description__item}>
                <img
                  src={university}
                  alt=""
                  className={styles.description__icon}
                />{" "}
                <h3 className={styles.description__data}>Универ</h3>
              </li>
              <li className={styles.description__item}>
                <img
                  src={birthday}
                  alt=""
                  className={styles.description__icon}
                />
                <h3 className={styles.description__data}>Дата рождения</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
