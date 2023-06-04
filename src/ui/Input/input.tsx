import { ChangeEvent, FC, useState } from "react";
import styles from "./style.module.scss";

interface inputProps {
  placeholder?: string;
  iconUrl?: string;
  className?: string;
  type?: string;
  onChange?: (arg0: string | undefined) => void;
  onClick?: (arg0: string | undefined) => void;
}

export const Input: FC<inputProps> = (props) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    !!e.target.value ? setValue(e.target.value) : setValue("");
    if (!!props.onChange) props.onChange(value);
  };

  const onClick = () => {
    if (!!props.onClick) props.onClick(value);
  };

  return (
    <label className={styles.inputBox}>
      {props.iconUrl && (
        <button className={styles.inputBtn} onClick={onClick}>
          <img src={props.iconUrl} alt="button icon" />
        </button>
      )}
      <input
        onChange={onChange}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className={styles.input}
      />
    </label>
  );
};
