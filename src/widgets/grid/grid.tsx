import type { ReactNode } from "react";
import styles from "./grid.module.css";

interface GridProps {
  children: ReactNode | ReactNode[];
  columns?: number;
  gap?: string;
  className?: string;
}

export const Grid = ({ children }: GridProps) => {
  return (
    <div className={styles.grid_container}>
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
