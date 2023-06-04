import { FC, KeyboardEventHandler, useRef, useState, MouseEvent } from "react";
import styles from "./style.module.scss";

interface sortProps {
  optionsArr: Array<string>;
  cbFn: (arg0: string) => void;
}

export const SortComp: FC<sortProps> = ({ optionsArr, cbFn }) => {
  const [sortBy, setSortBy] = useState("Выбрать");
  const [arr] = useState(optionsArr);
  const list = useRef(null);
  const [isShownList, setIsShownList] = useState(false);

  const handleOptionClick = (e: MouseEvent, i: string) => {
    setSortBy(i);
    setIsShownList(!isShownList);
    cbFn(i);
  };

  const keyboardHandle: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case "Escape":
        setIsShownList(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.sort} onKeyDown={keyboardHandle}>
      <span className={styles.sort__heading}>Сортировка:</span>
      <div
        className={styles.list__wrapper}
        onClick={() => setIsShownList(!isShownList)}
        onBlur={() => setIsShownList(false)}
        tabIndex={0}>
        <span className={styles.sort__selected}>
          {sortBy}
          <svg
            width="7"
            height="6"
            viewBox="0 0 7 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5 6L0.468911 0.750001L6.53109 0.75L3.5 6Z"
              fill="#3F4E65"
            />
          </svg>
        </span>
        <ul
          className={`${styles.sort__list} ${isShownList ? "" : styles.hidden}`}
          ref={list}>
          {arr.map((option: string) => (
            <li
              className={styles.sort__option}
              key={option}
              onClick={(e) => handleOptionClick(e, option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
