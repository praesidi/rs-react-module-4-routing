import type { ReactNode } from "react";
import styles from "./grid.module.css";

interface GridProps {
  children: ReactNode | ReactNode[];
  className: string | null;
}

export const Grid = ({ children, className = null }: GridProps) => {
  return (
    <div className={`${styles.grid_container} ${className ?? className}`}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
};

interface ItemProps {
  children: ReactNode;
}

export const Item = ({ children }: ItemProps) => {
  return (
    <>
      <div className={styles.item_container}>{children}</div>
    </>
  );
};
