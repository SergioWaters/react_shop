import { FC, MouseEvent, MouseEventHandler } from "react";
import styles from "./style.module.scss";

interface buttonProps {
  type?: "submit" | "button" | "reset" | undefined;
  text?: string;
  iconUrl?: string;
  className?: string;
  onClick?: MouseEventHandler;
}

export const Button: FC<buttonProps> = ({
  text,
  iconUrl,
  className,
  onClick,
  type,
}) => {
  const uClass = className || "";

  return !text ? (
    <button
      type={type}
      className={styles.button + " " + styles.rounded + " " + uClass}
      onClick={onClick}>
      {iconUrl ? <img src={iconUrl} alt="button icon" /> : ""}
    </button>
  ) : (
    <button className={styles.button + " " + uClass} onClick={onClick}>
      <span>{text}</span>
      {iconUrl ? <img src={iconUrl} alt="button icon" /> : ""}
    </button>
  );
};
