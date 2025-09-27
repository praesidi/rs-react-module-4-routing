import styles from "./layout.module.css";
import { Outlet } from "react-router";
import { Header } from "../../../widgets/header/header";
import { Footer } from "../../../widgets/footer/footer";
import { ErrorBoundary } from "../error-boundary/error-boundary";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </div>
  );
};
