import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesComponent from "./routes/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RoutesComponent />
  </StrictMode>,
);
