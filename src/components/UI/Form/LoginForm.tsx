import React, { FC } from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import {
  fetchUserLogin,
  LoginRes,
  selectIsAuth,
} from "../../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ILogin } from "../../../types/types";

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
    mode: "onBlur",
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
    <div className={styles.fromField}>
      <div className={styles.fromField__container}>
        <span className={styles.fromField__title}>Авторизация</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.fromField__form}
        >
          <div className={styles.fromField__input}>
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
          </div>
          {errors?.email && (
            <div className={styles.fromField__error}>
              {errors.email.message}
            </div>
          )}

          <div className={styles.fromField__input}>
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
          </div>
          {errors?.password && (
            <div className={styles.fromField__error}>
              {errors.password.message}
            </div>
          )}
          <div className={styles.fromField__button}>
            <button type="submit" className={styles.button}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
