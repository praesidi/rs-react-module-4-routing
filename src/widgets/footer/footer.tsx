import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        made by{" "}
        <a href="https://github.com/praesidi" target="_blank">
          praesidi
        </a>
      </footer>
    </>
  );
};
