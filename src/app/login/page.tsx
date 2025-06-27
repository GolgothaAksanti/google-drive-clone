import React from "react";

import GuestRoute from "@/components/guest-route";
import { LoginForm } from "@/components/login-form";

const Page = () => {
  return (
    <GuestRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </GuestRoute>
  );
};

export default Page;
