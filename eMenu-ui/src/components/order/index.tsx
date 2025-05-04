"use client";

import React, { Fragment } from "react";

export interface Order {
  orderID: string;
  pedido: string;
}

export interface OrderProps {
  userOrder: Order[];
}

const Order = ({ userOrder }: OrderProps) => {
  return (
    <Fragment>
      <div className="py-4 mx-40 text-xl rounded-lg bg-gray-100">
        <h2 className="text-center text-3xl font-mono pb-8">
          ¡Tu pedido fue registrado con éxito!
        </h2>

        <span className="text-center text-lg font-mono">
          Detalles de tu pedido
        </span>
        <div className="grid col-span-3 gap-10 mt-2 justify-start">
          {userOrder.map((order) => (
            <div
              className="border border-gray-300 py-2 px-12 rounded-lg"
              key={order.orderID}
            >
              <div className="mb-4">
                <div className="">
                  <h5 className="font-semibold font-mono">
                    Pedido: {order.pedido}
                  </h5>
                  <p className="">
                    <small className="font-mono">ID: #{order.orderID}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
