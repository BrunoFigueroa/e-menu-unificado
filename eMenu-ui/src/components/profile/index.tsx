"use client";

import React, { Fragment } from "react";

export interface User {
  name: string;
  phone: string;
  email: string;
}

export interface UserRecipes {
  id: number;
  nombre: string;
  ingredientes: string;
  categoria: string;
  preparacion: string;
  tiempo: string;
  votos: number;
}

export interface FavoritesRecipes {
  id: number;
  nombre: string;
  ingredientes: string;
  preparacion: string;
}

export interface ProfileProps {
  user: User;
  userRecipes: UserRecipes[];
  favoritesRecipes: FavoritesRecipes[];
}

const Profile = ({ user, userRecipes, favoritesRecipes }: ProfileProps) => {
  const handleEditProfile = () => {};

  const handleUploadRecipe = () => {};

  const handleEditRecipe = (recipeId: number) => {};

  const handleDeleteRecipe = (recipeId: number) => {};

  const handleRemoveFavorite = (recipeId: number) => {};

  const handleDeleteAccount = () => {};

  return (
    <Fragment>
      <div className="py-4 mx-40 text-xl rounded-lg bg-gray-100">
        <h2 className="text-center text-3xl font-mono">
          Bienvenido a tu perfil{" "}
          <span className="text-indigo-600">{user.name}</span>
        </h2>

        <div className="grid col-span-3 gap-3 mt-6 justify-start">
          <h2 className="text-2xl font-mono mt-2">Tus datos</h2>
          <div className="border border-gray-300 py-2 px-12 rounded-lg">
            <div className="mb-4">
              <div className="">
                <h5 className="font-semibold font-mono">{user.name}</h5>
                <p className="">
                  <small className="font-mono">Teléfono: {user.phone}</small>
                </p>
                <p className="">
                  <small className="font-mono">Email: {user.email}</small>
                </p>
                <div className="flex gap-4 mt-3">
                  <p>
                    <button
                      onClick={handleEditProfile}
                      className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-3 font-mono text-lg"
                    >
                      Editar perfil
                    </button>
                  </p>
                  <p>
                    <button
                      onClick={handleUploadRecipe}
                      className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-3 font-mono text-lg"
                    >
                      Subir receta
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-mono mt-6">Tus Recetas</h2>
        <div className="grid col-span-3 gap-10 mt-6 justify-start">
          {userRecipes.map((recipe) => (
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
              </div>
              <div className="flex gap-4 mt-3 mb-4">
                <p>
                  <button
                    onClick={() => handleEditRecipe(recipe.id)}
                    className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-3 font-mono text-lg"
                  >
                    Editar receta
                  </button>
                </p>
                <p>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-3 font-mono text-lg"
                  >
                    Eliminar receta
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-mono mt-6">Tus recetas favoritas</h2>
        <div className="grid col-span-3 gap-10 mt-6 justify-start">
          {favoritesRecipes.map((recipe: FavoritesRecipes) => (
            <div
              className="border border-gray-300 py-2 px-12 rounded-lg"
              key={recipe.id}
            >
              <div className="mb-4">
                <div className="">
                  <h5 className="font-semibold font-mono">{recipe.nombre}</h5>
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
                </div>
              </div>
              <div className="flex gap-4 mt-3 mb-4">
                <p>
                  <button
                    onClick={() => handleRemoveFavorite(recipe.id)}
                    className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-3 font-mono text-lg"
                  >
                    Eliminar de favoritas
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleDeleteAccount}
            className="bg-gray-500 hover:bg-red-600 rounded-lg px-3 font-mono text-lg"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
