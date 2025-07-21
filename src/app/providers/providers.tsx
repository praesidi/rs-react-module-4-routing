import { BrowserRouter } from "react-router";
import { AuthProvider } from "./auth/auth";
import { Router } from "./router/router";

export const Providers = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};
