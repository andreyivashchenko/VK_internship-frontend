import React from "react";
import styles from "./Form.module.scss";
import {
  fetchRegistration,
  LoginRes,
  selectIsAuth,
} from "../../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { IRegisteration } from "../../../types/types";
import { CommonButton } from "../Button/Button";

const Registration = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (values: IRegisteration) => {
    await dispatch(fetchRegistration(values))
      .then((action) => {
        if (action.meta.requestStatus === "rejected") {
          alert(`${action.payload}, попробуйте еще раз`);
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
        <span className={styles.fromField__title}>Регистрация</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.fromField__form}
        >
          <div className={styles.fromField__input}>
            <input
              className={styles.input}
              type="text"
              placeholder={"firstname"}
              {...register("firstname", {
                required: "Укажите имя ",
              })}
            />
          </div>
          {errors?.firstname && (
            <span className={styles.fromField__error}>
              {errors.firstname.message}
            </span>
          )}
          <div className={styles.fromField__input}>
            <input
              className={styles.input}
              type="text"
              placeholder={"lastname"}
              {...register("lastname", {
                required: "Укажите фамилию",
              })}
            />
          </div>
          {errors?.lastname && (
            <span className={styles.fromField__error}>
              {errors.lastname.message}
            </span>
          )}
          <div className={styles.fromField__input}>
            <input
              className={styles.input}
              type="text"
              placeholder={"email"}
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
            <span className={styles.fromField__error}>
              {errors.email.message}
            </span>
          )}
          <div className={styles.fromField__input}>
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
            <span className={styles.fromField__error}>
              {errors.password.message}
            </span>
          )}
          <div className={styles.fromField__button}>
            <CommonButton size={"medium"}>Зарегистрироваться</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
