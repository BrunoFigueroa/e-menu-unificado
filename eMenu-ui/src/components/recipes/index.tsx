import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export interface Recipe {
  id: number;
  usuarioid: number;
  nombre: string;
  ingredientes: string;
  categoria: string;
  preparacion: string;
  tiempo: string;
  votos: number;
}

export interface RecipesProps {
  recipes: Recipe[];
  favorites: number[];
  handleFavorite: (recipeId: number) => void;
}

const Recipes = ({ recipes, favorites, handleFavorite }: RecipesProps) => {
  return (
    <div>
      <h2 className="text-center font-mono text-2xl">Recetas</h2>
      <div className="grid col-span-3 gap-10 mt-6 justify-center">
        {recipes.map((recipe) => (
          <div
            className="border border-gray-300 py-2 px-12 rounded-lg"
            key={recipe.id}
          >
            <div className="mb-4">
              <div className="">
                <h5 className="font-semibold font-mono">{recipe.nombre}</h5>
                <p className="">
                  <small className="font-mono">
                    Categoría: {recipe.categoria}
                  </small>
                </p>
                <p className="">
                  <small className="font-mono">
                    Ingredientes: {recipe.ingredientes}
                  </small>
                </p>
                <p className="">
                  <small className="font-mono">
                    Preparación: {recipe.preparacion}
                  </small>
                </p>
                <p className="">
                  <small className="font-mono">Tiempo: {recipe.tiempo}</small>
                </p>
                <p className="">
                  <small className="font-mono">Likes: {recipe.votos}</small>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleFavorite(recipe.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  {favorites.includes(recipe.id) ? (
                    <FaHeart size={24} />
                  ) : (
                    <FaRegHeart size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
