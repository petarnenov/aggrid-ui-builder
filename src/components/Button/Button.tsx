import React from "react";
import styles from "./Button.module.scss";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "standard"
  | "danger"
  | "success";
type ButtonSize = "small" | "medium" | "large";

type ButtonVerticalPosition = "top" | "center" | "bottom";
type ButtonHorizontalPosition = "left" | "center" | "right";

type ButtonProps = {
  variant: ButtonVariant;
  verticalPosition?: ButtonVerticalPosition;
  horizontalPosition?: ButtonHorizontalPosition;
  size?: ButtonSize;
  children: React.ReactNode;
};

const Button = ({
  variant,
  size = "small",
  verticalPosition = "center",
  horizontalPosition = "center",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <div className={styles.buttonWrapper}>
      <button
        className={styles.button}
        data-variant={variant}
        data-size={size}
		data-vertical-position={verticalPosition}
		data-horizontal-position={horizontalPosition}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
