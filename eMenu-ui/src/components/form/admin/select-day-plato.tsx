"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSelectDayPlatoHook } from "@/hooks/plato/use-select-day-plato";
import { useSearchPlatoHook } from "@/hooks/plato/use-search-plato";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

const formSchema = z.object({
  id_plato: z.string().min(1, {
    message: "El plato es requerido.",
  }),
  fecha: z.string().min(1, {
    message: "La fecha es requerida.",
  }),
});

export const SelectDayPlatoForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useSelectDayPlatoHook();
  const [todayDate, setTodayDate] = useState(getTodayDate());
  const { data, isPending: isLoadingPlatos } = useSearchPlatoHook({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fecha: todayDate,
    },
  });

  useEffect(() => {
    setValue("fecha", todayDate);
  }, [todayDate, setValue]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("¡Plato seleccionado para el día!");
          router.push("/");
        } else {
          toast.error(data.message || "Error al seleccionar el plato.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Ocurrió un error desconocido.");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Realizar Pedido</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="id_plato"
            className="block text-sm font-medium text-gray-700"
          >
            Plato
          </label>
          <select
            id="id_plato"
            {...register("id_plato")}
            disabled={isLoadingPlatos}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Selecciona un plato</option>
            {Array.isArray(data?.platos) ? (
              data.platos.map((plato: any) => (
                <option key={plato.id_plato} value={plato.id_plato}>
                  {plato.nombre} - ${plato.precio}
                </option>
              ))
            ) : data?.platos ? (
              <option key={data.platos.id_plato} value={data.platos.id_plato}>
                {data.platos.nombre} - ${data.platos.precio}
              </option>
            ) : null}
          </select>
          {errors.id_plato && (
            <p className="text-sm text-red-500 mt-1">
              {errors.id_plato.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register("fecha")} />

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Confirmando..." : "Confirmar"}
          </button>
        </div>
      </form>
      <div className="text-center text-gray-600 mt-4">
        ¿Quieres ver el menú?{" "}
        <a
          href="/menu"
          className="text-gray-600 hover:text-gray-800 font-semibold"
        >
          Ver Menú
        </a>
      </div>
    </div>
  );
};

export default SelectDayPlatoForm;
