
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "react-quill/dist/quill.snow.css";

import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>

        {/* =====================================================
            DESPIRE TOAST NOTIFICATIONS
        ===================================================== */}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}

          toastOptions={{
            // Default toast
            duration: 3500,

            style: {
              background: "#0f172a",
              color: "#f8fafc",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "16px",
              padding: "14px 16px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 35px rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(12px)",
            },

            // Success Toast
            success: {
              duration: 3500,

              style: {
                background: "#0f172a",
                color: "#f8fafc",
                border: "1px solid rgba(34, 197, 94, 0.4)",
              },

              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },

            // Error Toast
            error: {
              duration: 4500,

              style: {
                background: "#0f172a",
                color: "#f8fafc",
                border: "1px solid rgba(239, 68, 68, 0.45)",
              },

              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },

            // Loading Toast
            loading: {
              duration: Infinity,

              style: {
                background: "#0f172a",
                color: "#f8fafc",
                border: "1px solid rgba(139, 92, 246, 0.4)",
              },

              iconTheme: {
                primary: "#8b5cf6",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <App />

      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);


/* =========================================================
   DESPIRE PWA SERVICE WORKER
========================================================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("DeSpire PWA Ready 🚀");
      })
      .catch((error) => {
        console.error(
          "DeSpire Service Worker registration failed:",
          error
        );
      });
  });
}

