import { FC, useState } from "react";
import styles from "./style.module.scss";

interface props {
  pages: number;
  onClick: (arg0: number) => void;
}
export const PaginationComp: FC<props> = ({ pages, onClick }) => {
  const [active, setActive] = useState<number>(1);

  const pickPage = (num: number) => {
    setActive(() => num);
    onClick(num);
    console.log(num, active);
  };

  const prevPage = () => {
    console.log("prev", active);
    if (active === 1) return;
    setActive((curr) => curr - 1);
    onClick(active - 1);
  };

  const nextPage = () => {
    console.log("next", active);
    if (active === pages) return;
    setActive((curr) => curr + 1);
    onClick(active + 1);
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={prevPage}>
        <span className={styles.button_left}></span>
      </button>
      {[...Array(pages).keys()].map((n) => (
        <button
          onClick={() => pickPage(n + 1)}
          key={n}
          className={
            n + 1 === active || pages === 1
              ? styles.button + " " + styles.button_active
              : styles.button
          }>
          {n + 1}
        </button>
      ))}
      <button className={styles.button} onClick={nextPage}>
        <span className={styles.button_right}></span>
      </button>
    </div>
  );
};
