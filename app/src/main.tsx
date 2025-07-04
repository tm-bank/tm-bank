import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css"
import { AuthProvider } from "./providers/auth-provider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
