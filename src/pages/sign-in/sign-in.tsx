import styles from "./sign-in.module.css";
import { useEffect, type FormEvent } from "react";
import { useAuth } from "../../app/providers/auth/useAuth";
import { useLocation, useNavigate } from "react-router";
import LoginImage from "/images/login.png";
import { Button } from "../../shared/components/button/button";
import { internalPaths } from "../../shared/constants/routes";
import ErrorBoundary from "../../shared/components/error-boundary/error-boundary";

export const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const fromPath = location.state?.from || internalPaths.home;

  useEffect(() => {
    if (auth?.user !== null) {
      navigate(fromPath, { replace: true });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    auth?.signin(login, password, () => {
      navigate(fromPath, { replace: true });
    });
  };

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.image_wrapper}>
          <img src={LoginImage} alt="" />
        </div>
        <h1 className={styles.title}>Sign In or leave b*tch</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_wrapper}>
            <input type="text" name="login" id="login" placeholder="login*" required />
          </div>
          <div className={styles.input_wrapper}>
            <input type="password" name="password" id="password" placeholder="password*" required />
          </div>
          <div className={styles.submit_button_wrapper}>
            <Button type="submit" disabled={auth?.loading}>
              {auth?.loading ? "Loading" : "Sign In"}
            </Button>
          </div>
          <p className={styles.error}>{auth?.error || "‎"}</p>
        </form>
      </div>
    </ErrorBoundary>
  );
};
