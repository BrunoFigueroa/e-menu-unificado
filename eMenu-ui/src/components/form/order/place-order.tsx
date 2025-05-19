"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { usePlaceOrderHook } from "@/hooks/order/use-place-order";
import { useRouter } from "next/router";

const formSchema = z.object({
  fecha_hora: z.string().min(1, {
    message: "La fecha y hora son requeridas.",
  }),
  mesa: z.string().min(1, {
    message: "La mesa es requerida.",
  }),
  id_estado_pedido: z.string().min(1, {
    message: "El estado del pedido es requerido.",
  }),
  tiempo_espera_actualizado: z.string().min(1, {
    message: "El tiempo de espera es requerido.",
  }),
  comentarios: z.string().optional(),
});

const PlaceOrderForm = () => {
  const router = useRouter();
  const { isPending, mutate } = usePlaceOrderHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const placeOrderRequest = {
      fecha_hora: values.fecha_hora,
      mesa: values.mesa,
      id_estado_pedido: values.id_estado_pedido,
      tiempo_espera_actualizado: values.tiempo_espera_actualizado,
      comentarios: values.comentarios || "",
    };

    await mutate(placeOrderRequest, {
      onSuccess: (data) => {
        const orderID = data.orderID;
        if (data.success) {
          toast.success("¡Pedido exitoso!");
          router.push(`/order/${orderID}`);
        } else {
          toast.error(data.message || "Error al realizar el pedido.");
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
            htmlFor="fecha_hora"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha y Hora
          </label>
          <input
            type="text"
            id="fecha_hora"
            {...register("fecha_hora")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.fecha_hora && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fecha_hora.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="mesa"
            className="block text-sm font-medium text-gray-700"
          >
            Mesa
          </label>
          <input
            type="text"
            id="mesa"
            {...register("mesa")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.mesa && (
            <p className="text-sm text-red-500 mt-1">{errors.mesa.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="id_estado_pedido"
            className="block text-sm font-medium text-gray-700"
          >
            Estado del Pedido
          </label>
          <input
            type="text"
            id="id_estado_pedido"
            {...register("id_estado_pedido")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.id_estado_pedido && (
            <p className="text-sm text-red-500 mt-1">
              {errors.id_estado_pedido.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tiempo_espera_actualizado"
            className="block text-sm font-medium text-gray-700"
          >
            Tiempo de Espera Actualizado
          </label>
          <input
            type="text"
            id="tiempo_espera_actualizado"
            {...register("tiempo_espera_actualizado")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.tiempo_espera_actualizado && (
            <p className="text-sm text-red-500 mt-1">
              {errors.tiempo_espera_actualizado.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="comentarios"
            className="block text-sm font-medium text-gray-700"
          >
            Comentarios
          </label>
          <textarea
            id="comentarios"
            {...register("comentarios")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.comentarios && (
            <p className="text-sm text-red-500 mt-1">
              {errors.comentarios.message}
            </p>
          )}
        </div>

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
        Quieres ver el menu?{" "}
        <a
          href="/menu"
          className="text-gray-600 hover:text-gray-800 font-semibold"
        >
          Ver Menu
        </a>
      </div>
    </div>
  );
};

export default PlaceOrderForm;
