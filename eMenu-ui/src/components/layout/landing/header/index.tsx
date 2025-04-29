"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center p-4 bg-black shadow-md">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="px-3 py-2 text-white hover:text-gray-300">
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="/recipes"
            className="px-3 py-2 text-white hover:text-gray-300"
          >
            Explorar recetas
          </Link>
        </li>
      </ul>

      <div className="flex space-x-2">
        {session?.user?.id ? (
          <Link
            href={`/profile/${session.user.id}`}
            className="px-4 py-2 border border-gray-600 text-white hover:bg-gray-600 hover:text-white rounded"
          >
            Perfil
          </Link>
        ) : (
          <Link
            href="/register"
            className="px-4 py-2 border border-gray-600 text-white hover:bg-gray-600 hover:text-white rounded"
          >
            Registrarse
          </Link>
        )}
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 border border-gray-600 text-white hover:bg-gray-600 hover:text-white rounded"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 border border-gray-600 text-white hover:bg-gray-600 hover:text-white rounded"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
