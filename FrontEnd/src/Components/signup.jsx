import React from "react";

import {
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-4">

      <SignedOut>

        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              card: "shadow-2xl rounded-3xl",
            },
          }}
        />

      </SignedOut>

      <SignedIn>

        <div className="text-white text-3xl font-bold">
          You are already signed in ✅
        </div>

      </SignedIn>

    </div>
  );
};

export default Signup;