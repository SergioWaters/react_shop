import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { FC } from "react";

interface link {
  path: string;
  title: string | undefined;
}

interface P {
  links: link[] | [];
}

export const BreadCrumbs: FC<P> = ({ links }) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className="container">
        <ul className={styles.list}>
          {links.map((l: link) => (
            <li key={l.title + l.path} className={styles.link}>
              <Link to={l.path}>{l.title} </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
