import ErrorBoundary from "../../shared/components/error-boundary/error-boundary";
import { internalPaths } from "../../shared/constants/routes";
import styles from "./home.module.css";
import { Link } from "react-router";

export const Home = () => {
  return (
    <ErrorBoundary>
      <div className={styles.page}>
        <div className={styles.logo_wrapper}>
          <img src="./images/logo.png" alt="logo" />
        </div>
        <nav className={styles.navbar}>
          <Link
            to={internalPaths.category("characters")}
            className={`${styles.link_wrapper} ${styles.characters}`}
          >
            <span>Characters</span>
          </Link>

          <Link
            to={internalPaths.category("episodes")}
            className={`${styles.link_wrapper} ${styles.episodes}`}
          >
            Episodes
          </Link>

          <Link
            to={internalPaths.category("locations")}
            className={`${styles.link_wrapper} ${styles.locations}`}
          >
            Locations
          </Link>
        </nav>
      </div>
    </ErrorBoundary>
  );
};
