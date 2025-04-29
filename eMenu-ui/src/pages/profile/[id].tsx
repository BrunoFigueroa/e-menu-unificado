import React, { Fragment, ReactElement } from "react";
import Profile from "@/components/profile";
import LandingLayout from "@/components/layout/landing/layout";
import { useRetrieveProfileUserHook } from "@/hooks/user/use-retrieve-profile-user";
import { useSession } from "next-auth/react";

const ProfileView = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data, isPending, isFetching, isError, error } =
    useRetrieveProfileUserHook({ id: userId });

  if (isPending || isFetching) {
    return <div className="font-mono py-4">Cargando perfil...</div>;
  }

  if (isError) {
    return <div className="font-mono py-4">Error: {error?.message}</div>;
  }

  const user = {
    name: data?.user.nombre || "",
    phone: data?.user.telefono || "",
    email: data?.user.email || "",
  };

  const userRecipes = Array.isArray(data?.recipes)
    ? data.recipes.map((recipe) => ({
        id: Number(recipe.id),
        nombre: recipe.nombre,
        ingredientes: recipe.ingredientes,
        categoria: recipe.categoria,
        preparacion: recipe.pasos,
        tiempo: recipe.tiempo,
        votos: Number(recipe.votos),
      }))
    : [];

  const favoritesRecipes = Array.isArray(data?.favorites)
    ? data.favorites.map((favorite) => ({
        id: Number(favorite.id),
        nombre: favorite.nombre,
        ingredientes: favorite.ingredientes,
        preparacion: favorite.pasos,
      }))
    : [];

  return (
    <Fragment>
      <div className="py-8 mx-40 text-xl rounded-lg bg-gray-100">
        <Profile
          user={user}
          userRecipes={userRecipes}
          favoritesRecipes={favoritesRecipes}
        />
      </div>
    </Fragment>
  );
};

ProfileView.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout showBreadcrumb={false}>{page}</LandingLayout>;
};

export default ProfileView;
