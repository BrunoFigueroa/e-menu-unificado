import React from "react";

export interface PopularRecipe {
    id: number;
    nombre: string;
    categoria: string;
    votos: number;
}

export interface PopularRecipesProps {
    popularRecipes: PopularRecipe[];
}

const PopularRecipes = ({ popularRecipes }: PopularRecipesProps) => {
  return (
    <div>
      <h2 className="text-center text-2xl font-mono">Recetas más populares</h2>
      <div className="flex col-span-3 gap-20 mt-6 justify-center">
        {popularRecipes.map((recipe) => (
          <div className="col-md-4 border border-gray-300 py-2 px-6 rounded-lg" key={recipe.id}>
            <div className="mb-4">
              <div className="">
                <h5 className="font-semibold font-mono">{recipe.nombre}</h5>
                <p className="">
                  <small className="font-mono">
                    Categoría: {recipe.categoria}
                  </small>
                </p>
                <p className="">
                  <small className="font-mono">Likes: {recipe.votos}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
