import React, { ReactElement } from "react";
import LoginUserForm from "@/components/form/user/login-user";
import LandingLayout from "@/components/layout/landing/layout";

const LoginView = () => {
  return (
    <div className="grid justify-center py-10">
      <div className="border p-4 rounded bg-white shadow-md">
        <LoginUserForm />
      </div>
    </div>
  );
};

LoginView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default LoginView;
