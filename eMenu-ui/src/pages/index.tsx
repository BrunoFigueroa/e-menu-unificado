import React, { Fragment } from "react";
import type { ReactElement } from "react";
import LandingLayout from "@/components/layout/landing/layout";
import PopularRecipes from "@/components/popularRecipes";

const HomeView = () => {
  const [popularRecipes, setPopularRecipes] = React.useState([
    {
      id: 1,
      nombre: "Tortilla de patatas",
      categoria: "Española",
      votos: 100,
    },
    {
      id: 2,
      nombre: "Paella",
      categoria: "Española",
      votos: 90,
    },
    {
      id: 3,
      nombre: "Ceviche",
      categoria: "Peruana",
      votos: 80,
    },
  ]);
  
  return (
    <Fragment>
      <div className="px-16 py-16">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="text-3xl font-mono font-semibold">
            Bienvenidos a nuestra aplicación de recetas de cocina
          </h1>
          <p className="text-lg font-mono py-4">
            Descubre nuevas recetas, comparte tus favoritas y vota por las
            mejores.
          </p>
        </div>
        <div className="py-8 mx-40 text-xl rounded-lg bg-gray-100">
          <PopularRecipes popularRecipes={popularRecipes} />
        </div>
      </div>
    </Fragment>
  );
};

HomeView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default HomeView;
