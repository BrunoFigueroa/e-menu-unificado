"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { usePlaceOrderHook } from "@/hooks/order/use-place-order";
import { useRouter } from "next/router";

const formSchema = z.object({
  pedido: z.string().min(1, {
    message: "El pedido es requerido.",
  }),
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
      pedido: values.pedido,
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
            htmlFor="pedido"
            className="block text-sm font-medium text-gray-700"
          >
            Pedido
          </label>
          <input
            type="text"
            id="pedido"
            {...register("pedido")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          {errors.pedido && (
            <p className="text-sm text-red-500 mt-1">{errors.pedido.message}</p>
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
