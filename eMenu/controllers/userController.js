import {
  createUser,
  getUser,
  getUserById,
  getUserRecipes,
  getUserFavorites,
} from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { nombre, telefono, email } = req.body;

  try {
    await createUser(nombre, telefono, email);

    console.log(`Usuario ${nombre} registrado con éxito.
        telefono: ${telefono} y email: ${email}`);

    res.status(200).json({
      success: true,
      message: "Usuario registrado con éxito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el usuario",
    });
  }
};

export const loginUser = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const user = await getUser(nombre, email);

    console.log(`Usuario ${nombre} intentando ingresar con email: ${email}`);
    console.log("resultado de la consulta:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    req.session.nombre = nombre;
    req.session.email = email;
    req.session.UsuarioID = user.usuarioid;

    console.log(`UsuarioID guardado en la sesión: ${req.session.UsuarioID}`);

    res.status(200).json({
      success: true,
      message: "Usuario ingresado con éxito",
      payload: {
        id: user.usuarioid,
        nombre: nombre,
        email: email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Hubo un error al ingresar el usuario",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    const recipes = await getUserRecipes(id);
    const favorites = await getUserFavorites(id);

    res.status(200).json({
      success: true,
      message: "Usuario recuperado con éxito",
      user,
      recipes,
      favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener el usuario",
    });
  }
};
