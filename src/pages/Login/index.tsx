import React, { FC } from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import {
  fetchUserLogin,
  LoginRes,
  selectIsAuth,
} from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ILogin } from "../../types/types";

const Login: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const onSubmit = async (values: ILogin) => {
    await dispatch(fetchUserLogin(values))
      .then((action) => {
        if (action.meta.requestStatus === "rejected") {
          alert(`${action.payload}, повторите попробуйте еще раз`);
          reset();
        }
        const data: LoginRes = action.payload as LoginRes;
        window.localStorage.setItem("token", data.token);
      })
      .catch((e) => {
        console.log(e);
      });
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
            placeholder={"Email"}
            {...register("email", {
              required: "Введите почту.",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Введите корректную почту.",
              },
            })}
          />
          {errors?.email && (
            <div className={styles.login__error}>{errors.email.message}</div>
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
