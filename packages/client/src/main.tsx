import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("index.html has no element with the ID root.");
}

createRoot(rootElement).render(
  <StrictMode>
    <h1>Dust Law</h1>
  </StrictMode>,
);
