import type { ReactNode } from "react";
import type { User } from "../../../entities/user";

export interface Props {
  children: ReactNode;
}

export interface AuthValue {
  user: User | null;
  loading?: boolean;
  error?: string;
  signin: (log: string, pass: string, callback?: () => void) => void;
  signout: (toPath?: string, replace?: boolean) => void;
}
