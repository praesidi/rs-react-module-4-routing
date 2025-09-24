import { createContext, useContext } from "react";
import type { AuthValue } from "./types";

const AuthContext = createContext<AuthValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};