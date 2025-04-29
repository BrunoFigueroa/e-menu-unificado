import { pool } from "../config/db.js";

export const getAllRecipes = async () => {
  const recipes = await pool.query("SELECT * FROM recipes");
  return recipes.rows;
};

export const getIngredientById = async (ingredientsId) => {
  const ingredient = await pool.query(
    "SELECT Nombre FROM ingredients WHERE IngredientesID = $1",
    [ingredientsId]
  );
  return ingredient.rows;
};

export const getCategoryById = async (categoryId) => {
  const category = await pool.query(
    "SELECT Tipo FROM categories WHERE CategoriaID = $1",
    [categoryId]
  );
  return category.rows;
};

export const createRecipe = async (
  usuarioId,
  nombre,
  ingredientesId,
  categoriaId,
  pasos,
  tiempo
) => {
  await pool.query(
    "INSERT INTO recipes (UsuarioID, Nombre, IngredientesID, CategoriaID, Pasos, Tiempo) VALUES ($1, $2, $3, $4, $5, $6)",
    [usuarioId, nombre, ingredientesId, categoriaId, pasos, tiempo]
  );
};
