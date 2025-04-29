import { config } from "@/config";

export type loginUserRequest = {
  nombre: string;
  email: string;
};

export type loginUserResponse = {
  success: boolean;
  message: string;
};

export const loginUser = async ({
  nombre,
  email,
}: loginUserRequest): Promise<loginUserResponse> => {
  try {
    const result = await fetch(`${config.api.url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        email,
      }),
    });

    if (!result.ok) {
      throw new Error("Error al ingresar el usuario.");
    }

    const response: loginUserResponse = await result.json();

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
