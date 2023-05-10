import React from "react";
import styles from "./Registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../slices/authSlice";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Registration = () => {
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
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      reset();
      return alert(`${data.error.message}`);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      reset();
      return alert(`${data.payload.message}`);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.registr}>
      <span className={styles.registr__title}>Регистрация</span>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.registr__form}>
        <div className={styles.registr__input}>
          <input
            className={styles.input}
            type="text"
            placeholder={"Username"}
            {...register("username", {
              required: "Укажите имя пользователя",
            })}
          />
          {errors?.username && (
            <div className={styles.registr__error}>
              {errors.username.message}
            </div>
          )}
        </div>
        <div className={styles.registr__input}>
          <input
            className={styles.input}
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
          <span className={styles.registr__error}>
            {errors.password.message}
          </span>
        )}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Registration;
