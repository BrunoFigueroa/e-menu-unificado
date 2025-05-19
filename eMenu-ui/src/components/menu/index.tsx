import React, { Fragment } from "react";

const Menu = () => {
  return (
    <Fragment>
      <section id="menu" className="py-10 px-4">
        <div className="container mx-auto space-y-10">
          <div id="desayunos">
            <h3 className="text-xl font-semibold mb-4">Desayunos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
                  alt="Huevos con tostadas"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">Huevos con tostadas</h5>
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => {
                      /* agregarPedido('Huevos con tostadas', 3500) */
                    }}
                  >
                    Agregar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="sandwiches">
            <h3 className="text-xl font-semibold mb-4">Sandwiches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
                  alt="Sándwich de jamón y queso"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">
                    Sándwich de jamón y queso
                  </h5>
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => {
                      /* agregarPedido('Sándwich de jamón y queso', 3000) */
                    }}
                  >
                    Agregar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="cafes">
            <h3 className="text-xl font-semibold mb-4">Cafés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348"
                  alt="Capuccino"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">Capuccino</h5>
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => {
                      /* agregarPedido('Capuccino', 2500) */
                    }}
                  >
                    Agregar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="tortas">
            <h3 className="text-xl font-semibold mb-4">Tortas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
                  alt="Torta de chocolate"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">Torta de chocolate</h5>
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => {
                      /* agregarPedido('Torta de chocolate', 4000) */
                    }}
                  >
                    Agregar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Menu;
