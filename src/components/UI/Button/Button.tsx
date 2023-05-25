import { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx(styles.baseBtn, className)} {...props}>
      {children}
    </button>
  );
};

interface CommonButtonProps extends BaseButtonProps {
  size?: "small" | "medium" | "large";
  image?: string;
}

const btnSize = {
  small: styles.commonBtn__small,
  medium: styles.commonBtn__medium,
  large: styles.commonBtn__large,
};

export const CommonButton: FC<CommonButtonProps> = ({
  children,
  size = "medium",
  image = "",
  ...props
}) => {
  return (
    <BaseButton className={clsx(styles.commonBtn, btnSize[size])} {...props}>
      {!image ? (
        children
      ) : (
        <div className={styles.commonBtn__row}>
          <div className={styles.commonBtn__img}>
            <img src={image} alt="btnLogo" />
          </div>
          {children}
        </div>
      )}
    </BaseButton>
  );
};
