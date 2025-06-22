import styles from "./layout.module.css";
import { Outlet } from "react-router";
import { Header } from "../../../widgets/header/header";
import { Footer } from "../../../widgets/footer/footer";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
