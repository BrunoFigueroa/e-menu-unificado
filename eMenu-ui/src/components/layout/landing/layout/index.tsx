"use client";

import React, { ReactNode, Fragment, useState } from "react";
import { useLayout } from "@/context/layout";
import Footer from "../footer";
import Header from "../header";
import { SessionProvider } from "next-auth/react";
import { set } from "react-hook-form";

type Props = {
  showBreadcrumb: boolean;
  children: ReactNode;
};

const LandingLayout = ({ showBreadcrumb, children }: Props) => {
  const {
    isLoading,
    sheetContent,
    setSheetContent,
    dialogContent,
    setDialogContent,
  } = useLayout();
  const showSheet = sheetContent !== null;
  const showDialog = dialogContent !== null;

  const [carritoOpen, setCarritoOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);

  return (
    <SessionProvider>
      <Fragment>
        <Header
          setCarritoOpen={setCarritoOpen}
          setCategoriasOpen={setCategoriasOpen}
          carritoCount={0}
        />

        {carritoOpen && (
          <div className="fixed inset-0 flex justify-end z-40">
            <div className="bg-white w-80 shadow-lg h-full p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Carrito de Compras</h5>
                <button
                  onClick={() => setCarritoOpen(false)}
                  className="text-gray-600 hover:text-black"
                >
                  ✖
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  No hay productos en el carrito.
                </p>
                <div className="flex justify-between items-center border-b py-2 mb-2">
                  <div>
                    <h6 className="font-semibold">Huevos con tostadas</h6>
                    <small className="text-gray-500">Cantidad: 1</small>
                  </div>
                  <span>$3.500</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>$3.500</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {categoriasOpen && (
          <div className="fixed inset-0 flex z-40">
            <div className="bg-gray-800 text-white w-64 p-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Categorías</h5>
                <button
                  onClick={() => setCategoriasOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  ✖
                </button>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#desayunos" className="hover:underline">
                    Desayunos
                  </a>
                </li>
                <li>
                  <a href="#cafes" className="hover:underline">
                    Cafés
                  </a>
                </li>
                <li>
                  <a href="#tortas" className="hover:underline">
                    Tortas
                  </a>
                </li>
              </ul>
            </div>
            <div
              onClick={() => setCategoriasOpen(false)}
              className="flex-1 bg-black bg-opacity-30"
            ></div>
          </div>
        )}

        {children}
        <Footer />
      </Fragment>
    </SessionProvider>
  );
};

export default LandingLayout;
