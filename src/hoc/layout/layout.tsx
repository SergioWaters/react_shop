import React, { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface P {
  main: ReactNode;
  breadcrumbs: ReactNode;
}
export const LayoutHOC: FC<P> = ({ main, breadcrumbs }) => {
  return (
    <main className={styles.layout + " main"}>
      <div className={styles.breadcrumbs}>{breadcrumbs}</div>
      <main className={styles.main}>{main}</main>
    </main>
  );
};
