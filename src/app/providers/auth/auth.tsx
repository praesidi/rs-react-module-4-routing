import UsersFakeDB from "../../../shared/mocks/users.json";
import type { User } from "../../../entities/user";
import { getRandomTimeoutMs } from "../../../shared/utils/delay";
import { createContext, useContext, useEffect, useState } from "react";
import { errorMessages } from "./consts";
import { useNavigate } from "react-router";
import type { AuthValue, Props } from "./types";

const findUser = async (login: string): Promise<User | null> => {
  const delayMs = getRandomTimeoutMs();
  const foundUser: User | null = UsersFakeDB.find((item) => item.login === login) ?? null;

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(foundUser);
    }, delayMs)
  );
};

const AuthContext = createContext<AuthValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const signin = async (login: string, password: string, callback?: () => void) => {
    try {
      setLoading(true);
      const foundUser = await findUser(login);

      if (foundUser === null) {
        setError(errorMessages.user_not_found);

        throw new Error(errorMessages.user_not_found);
      }

      if (foundUser.password !== password) {
        setError(errorMessages.wrong_password);

        throw new Error(errorMessages.wrong_password);
      }

      if (foundUser.password === password) {
        setError("");
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);

      if (callback) {
        console.log("callback called");
        callback();
      }
    }
  };

  const signout = (toPath?: string, replace?: boolean, callback?: () => void) => {
    setUser(null);
    localStorage.removeItem("user");

    if (toPath) {
      console.log(toPath, { replace: replace });
      navigate(toPath, { replace: replace });
    }

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const savedUserLocStorage = localStorage.getItem("user");

    if (savedUserLocStorage !== null) {
      const savedUser = JSON.parse(savedUserLocStorage) as User;
      setUser(savedUser);
      signin(savedUser?.login, savedUser?.password);
    }
  }, []);

  console.log(user);

  const value = {
    user,
    signin,
    signout,
    loading,
    error: error,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
