import { config } from "@/config";

export type registerUserRequest = {
  nombre: string;
  telefono: string;
  email: string;
};

export type registerUserResponse = {
  success: boolean;
  message: string;
};

export const registerUser = async ({
  nombre,
  telefono,
  email,
}: registerUserRequest): Promise<registerUserResponse> => {
  try {
    const result = await fetch(`${config.api.url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        telefono,
        email,
      }),
    });

    if (!result.ok) {
      throw new Error("Error al registrar el usuario.");
    }

    const response: registerUserResponse = await result.json();

    if (response.success === false) {
      console.log(response.message);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido.");
  }
};
