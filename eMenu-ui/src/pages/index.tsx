import React, { Fragment } from "react";
import type { ReactElement } from "react";
import LandingLayout from "@/components/layout/landing/layout";
import Menu from "@/components/menu";

const HomeView = () => {
  return (
    <Fragment>
      <section
        id="inicio"
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')",
        }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center pb-10 cursor-pointer"
          onClick={() =>
            document
              .getElementById("menu")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <h1 className="text-white text-4xl font-bold mb-2">
            Bienvenido a Café Magnolia
          </h1>
          <p className="text-white text-sm">Haz clic aquí para ver el menú</p>
        </div>
      </section>

      <Menu />

      <div className="text-center my-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
          alt="Logo Café"
          className="w-24 mx-auto"
        />
      </div>
    </Fragment>
  );
};

HomeView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default HomeView;
