import { Link } from "react-router";
import styles from "./header.module.css";
import { internalPaths } from "../../shared/constants/routes";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className={styles.right}>
          <nav className={styles.navbar}>
            <Link to={internalPaths.home}>Home</Link>
            <Link to={internalPaths.category("characters")}>Characters</Link>
            <Link to={internalPaths.category("episodes")}>Episodes</Link>
            <Link to={internalPaths.category("locations")}>Locations</Link>
          </nav>
        </div>
      </header>
    </>
  );
};
