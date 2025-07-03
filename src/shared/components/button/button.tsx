import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <>
      <button {...props} className={styles.button}>
        {props.children}
      </button>
    </>
  );
};
