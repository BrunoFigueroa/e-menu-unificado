import React, { Fragment, ReactElement } from "react";
import Order from "@/components/order";
import LandingLayout from "@/components/layout/landing/layout";
import { useRetrieveOrderHook } from "@/hooks/order/use-retrieve-order";
import { useRouter } from "next/router";

const OrderView = () => {
  const router = useRouter();
  const { id } = router.query;
  const orderID = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isFetching, isError, error } = useRetrieveOrderHook({
    orderID: orderID || "",
  });

  if (isPending || isFetching) {
    return <div className="font-mono py-4">Cargando pedido...</div>;
  }

  if (isError) {
    return <div className="font-mono py-4">Error: {error?.message}</div>;
  }

  const userOrder = data?.order
    ? Array.isArray(data.order)
      ? data.order.map((order) => ({
          orderID: order.orderid,
          pedido: order.pedido,
        }))
      : [
          {
            orderID: data.order.orderid,
            pedido: data.order.pedido,
          },
        ]
    : [];

  return (
    <Fragment>
      <div className="py-8 mx-40 text-xl rounded-lg bg-gray-100">
        <Order userOrder={userOrder} />
      </div>
    </Fragment>
  );
};

OrderView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default OrderView;
