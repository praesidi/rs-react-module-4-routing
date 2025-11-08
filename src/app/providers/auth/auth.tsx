import UsersFakeDB from "../../../shared/mocks/users.json";
import type { User } from "../../../models/user";
import { getRandomTimeoutMs } from "../../../shared/utils/delay";
import { createContext, useEffect, useState } from "react";
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

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
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
        callback();
      }
    }
  };

  const signout = (toPath?: string, replace?: boolean, callback?: () => void) => {
    setUser(null);
    localStorage.removeItem("user");

    if (toPath) {
      navigate(toPath, { replace: replace });
    }

    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    signin,
    signout,
    loading,
    error: error,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
