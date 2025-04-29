"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRegisterUserHook } from "@/hooks/user/use-register-user";
import { useRouter } from "next/router";

const formSchema = z.object({
  nombre: z.string().min(1, {
    message: "El nombre es requerido.",
  }),
  telefono: z.string().min(1, {
    message: "El teléfono es requerido.",
  }),
  email: z.string().email({
    message: "Correo electrónico inválido.",
  }),
});

const RegisterUserForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useRegisterUserHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const registerUserRequest = {
      nombre: values.nombre,
      telefono: values.telefono,
      email: values.email,
    };

    await mutate(registerUserRequest, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("¡Registro exitoso!");
          router.push("/login");
        } else {
          toast.error(data.message || "Error al registrar el usuario.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Ocurrió un error desconocido.");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.nombre && (
            <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            {...register("telefono")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.telefono && (
            <p className="text-sm text-red-500 mt-1">
              {errors.telefono.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
      <div className="text-center text-gray-600 mt-4">
        Ya tienes una cuenta?{" "}
        <a
          href="/login"
          className="text-gray-600 hover:text-gray-800 font-semibold"
        >
          Ingresar
        </a>
      </div>
    </div>
  );
};

export default RegisterUserForm;
