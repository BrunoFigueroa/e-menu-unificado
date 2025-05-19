"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export interface HeaderProps {
  setCarritoOpen: (open: boolean) => void;
  setCategoriasOpen: (open: boolean) => void;
  carritoCount: number;
}

const Header: React.FC<HeaderProps> = ({
  setCarritoOpen,
  setCategoriasOpen,
  carritoCount = 0,
}) => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4 ml-4">
            <li>
              <Link href="/" className="text-lg font-semibold">
                Café Magnolia
              </Link>
            </li>
          </ul>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-lg font-semibold">Mesa 12</h2>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <button
            className="relative border border-gray-400 rounded px-3 py-2 hover:bg-gray-200"
            onClick={() => setCarritoOpen?.(true)}
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {carritoCount}
            </span>
          </button>

          <button
            onClick={() => setCategoriasOpen?.(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Categorías
          </button>

          {session?.user?.id ? (
            <Link
              href={`/profile/${session.user.id}`}
              className="px-3 py-2 border border-gray-400 text-sm rounded hover:bg-gray-200"
            >
              Perfil
            </Link>
          ) : (
            <Link
              href="/register"
              className="px-3 py-2 border border-gray-400 text-sm rounded hover:bg-gray-200"
            >
              Registrarse
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="px-3 py-2 border border-gray-400 text-sm rounded hover:bg-gray-200"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 border border-gray-400 text-sm rounded hover:bg-gray-200"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
