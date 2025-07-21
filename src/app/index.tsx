import "./styles/index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Providers } from "./providers/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
