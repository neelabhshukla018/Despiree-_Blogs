import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import "react-quill/dist/quill.snow.css";

import { BrowserRouter } from 'react-router-dom'

import { ClerkProvider } from '@clerk/clerk-react'

import { Toaster } from "react-hot-toast";

const clerkPubKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <ClerkProvider
      publishableKey={clerkPubKey}
    >

      <BrowserRouter>

        {/* TOAST */}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{

            style: {

              background: "#0f172a",

              color: "#fff",

              border:
                "1px solid rgba(34,211,238,0.25)",

              padding: "16px",

              borderRadius: "18px",

            },

            success: {

              iconTheme: {

                primary: "#22d3ee",

                secondary: "#000",

              },

            },

          }}
        />

        <App />

      </BrowserRouter>

    </ClerkProvider>

  </React.StrictMode>

)