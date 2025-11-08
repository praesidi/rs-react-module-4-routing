import { Link } from "react-router";
import styles from "./header.module.css";
import { internalPaths } from "../../shared/constants/routes";
import { Button } from "../../shared/components/button/button";
import { useAuth } from "../../app/providers/auth/useAuth";

export const Header = () => {
  const auth = useAuth();

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
            <span className={styles.sign_out_button_wrapper}>
              <Button className={styles.sign_out_button} onClick={() => auth?.signout("/", true)}>
                Sign Out
              </Button>
            </span>
          </nav>
        </div>
      </header>
    </>
  );
};
