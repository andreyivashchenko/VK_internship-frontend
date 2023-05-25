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
  stretched?: boolean;
  textPositionLeft?: boolean;
}

const btnSize = {
  small: styles.commonBtn__small,
  medium: styles.commonBtn__medium,
  large: styles.commonBtn__large,
  stretched: styles.commonBtn__stretched,
};

export const CommonButton: FC<CommonButtonProps> = ({
  children,
  size = "medium",
  image = "",
  stretched = false,
  textPositionLeft = false,
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(
        styles.commonBtn,
        btnSize[size],
        stretched && styles.commonBtn__stretched,
        textPositionLeft && styles.commonBtn__textPositionLeft
      )}
      {...props}
    >
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
