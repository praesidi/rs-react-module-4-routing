import { Link } from "react-router";
import { Button } from "../../shared/components/button/button";
import styles from "./page-404.module.css";
import ErrorBoundary from "../../shared/components/error-boundary/error-boundary";

export const Page404 = () => {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <span className={styles.title}>
          Sorry! <br /> even Rick couldn't find the page.
        </span>

        <div className={styles.button_wrapper}>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
};
