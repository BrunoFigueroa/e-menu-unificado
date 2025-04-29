import {
  getAllRecipes,
  getIngredientById,
  getCategoryById,
  createRecipe
} from "../models/recipeModel.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();

    for (let recipe of recipes) {
      const ingredient = await getIngredientById(recipe.ingredientesid);
      const category = await getCategoryById(recipe.categoriaid);

      recipe.ingredientes = ingredient.nombre;
      recipe.categoria = category.tipo;
    }

    res.status(200).json({
      success: true,
      message: "Recetas obtenidas con éxito",
      recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener las recetas",
    });
  }
};

export const uploadRecipe = async (req, res) => {
  const { nombre, ingredientes, categoria, pasos, tiempo } = req.body;
  const UsuarioID = req.session.UsuarioID;

  try {
    await createRecipe(UsuarioID, nombre, ingredientes, categoria, pasos, tiempo);

    res.status(200).json({
      success: true,
      message: "Receta subida con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al subir la receta",
    });
  }
};
