import React, { ReactElement } from "react";
import LandingLayout from "@/components/layout/landing/layout";

const TestComponent = () => {
  return (
    <div className="bg-blue-500 text-white px-4 py-4">
      ¡Tailwind CSS está funcionando!
    </div>
  );
};

TestComponent.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default TestComponent;
