import React, { ChangeEventHandler, FC, HTMLAttributes, useState } from "react";
import styles from "./Input.module.scss";

import clsx from "clsx";

interface BaseInputProps extends HTMLAttributes<HTMLTextAreaElement> {}

export const BaseInput: FC<BaseInputProps> = ({
  className,
  placeholder,
  ...props
}) => {
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextareaHeight("auto");
    setTextareaHeight(`${event.target.scrollHeight}px`);
    console.log(event);
  };

  return (
    <textarea
      onChange={handleTextareaChange}
      style={{ height: textareaHeight }}
      id="myTextarea"
      className={clsx(styles.baseInput, className)}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
};

interface PostInputProps extends BaseInputProps {
  image?: string;
}

export const PostInput: FC<PostInputProps> = ({ image, ...props }) => {
  return (
    <div className={styles.postInput__row}>
      <div className={styles.postInput__img}>
        <img src={image} alt="avatar" />
      </div>
      <BaseInput className={clsx(styles.postInput)} {...props} />
    </div>
  );
};
