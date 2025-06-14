import styles from "./home.module.css";
import { Link } from "react-router";

export const Home = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.logo_wrapper}>
          <img src="./images/logo.png" alt="logo" />
        </div>
        <nav className={styles.navbar}>
          <Link
            to="/characters"
            className={`${styles.link_wrapper} ${styles.characters}`}
          >
            <span>Characters</span>
          </Link>

          <Link
            to="/episodes"
            className={`${styles.link_wrapper} ${styles.episodes}`}
          >
            Episodes
          </Link>

          <Link
            to="/locations"
            className={`${styles.link_wrapper} ${styles.locations}`}
          >
            Locations
          </Link>
        </nav>
      </div>
    </>
  );
};
