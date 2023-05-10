import React from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../slices/authSlice";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      reset();
      return alert(`${data.error.message}`);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      reset();
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.login}>
      <span className={styles.login__title}>Авторизация</span>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
        <div className={styles.login__input}>
          <input
            type="text"
            placeholder={"Username"}
            {...register("username", {
              required: "Укажите имя пользователя",
            })}
          />
          {errors?.username && (
            <div className={styles.login__error}>{errors.username.message}</div>
          )}
        </div>

        <div className={styles.login__input}>
          <input
            type="text"
            placeholder={"Password"}
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 4,
                message: "Длина пароля должна быть от 4 до 10 символов",
              },
              maxLength: {
                value: 10,
                message: "Длина пароля должна быть от 4 до 10 символов",
              },
            })}
          />
          {errors?.password && (
            <div className={styles.login__error}>{errors.password.message}</div>
          )}
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
