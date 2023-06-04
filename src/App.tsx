import { FooterComp, HeaderComp } from "./components";
import { RoutesHOC } from "./hoc/routes";
import styles from "./styles/App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <HeaderComp />
      <RoutesHOC />
      <FooterComp />
    </div>
  );
}

export default App;
