import React, { useEffect, useState } from "react";
import PlaceOrderForm from "@/components/form/order/place-order";
import LandingLayout from "@/components/layout/landing/layout";

const OrderView = () => {
  return (
    <div className="grid justify-center py-10">
      <div className="border p-4 rounded bg-white">
        <PlaceOrderForm />
      </div>
    </div>
  );
};

OrderView.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default OrderView;
