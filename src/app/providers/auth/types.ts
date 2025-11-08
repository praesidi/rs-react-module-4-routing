import type { ReactNode } from "react";
import type { User } from "../../../models/user";

export interface Props {
  children: ReactNode;
}

export interface AuthValue {
  user: User | null;
  loading?: boolean;
  error?: string;
  signin: (log: string, pass: string, callback?: () => void) => void;
  signout: (toPath?: string, replace?: boolean, callback?: () => void) => void;
}
