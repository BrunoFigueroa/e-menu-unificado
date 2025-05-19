import React, { useEffect, useState } from "react";
import SelectDayPlatoForm from "@/components/form/admin/select-day-plato";
import LandingLayout from "@/components/layout/landing/layout";

const SelectPlateView = () => {
  return (
    <div className="grid justify-center py-10">
      <div className="border p-4 rounded bg-white">
        <SelectDayPlatoForm />
      </div>
    </div>
  );
};

SelectPlateView.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default SelectPlateView;
