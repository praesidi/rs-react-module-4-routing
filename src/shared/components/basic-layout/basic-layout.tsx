import styles from "./basic-layout.module.css";
import type { ReactNode } from "react";

interface BasicLayoutProps {
  headerSlot: ReactNode;
  children: ReactNode;
  footerSlot: ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  headerSlot,
  children,
  footerSlot,
}) => {
  return (
    <div className={styles.layout}>
      <>{headerSlot}</>
      <>{children}</>
      <>{footerSlot}</>
    </div>
  );
};

export { BasicLayout };
