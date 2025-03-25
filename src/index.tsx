// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import RouterApp from "./router";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>
);
