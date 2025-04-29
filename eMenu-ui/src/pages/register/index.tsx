import React, { useEffect, useState } from "react";
import RegisterUserForm from "@/components/form/user/register-user";
import LandingLayout from "@/components/layout/landing/layout";

const RegisterView = () => {
  return (
    <div className="grid justify-center py-10">
      <div className="border p-4 rounded bg-white">
        <RegisterUserForm />
      </div>
    </div>
  );
};

RegisterView.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default RegisterView;
