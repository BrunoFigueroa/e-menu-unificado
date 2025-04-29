import { pool } from "../config/db.js";

export const createUser = (nombre, telefono, email) => {
  return pool.query(
    "INSERT INTO users (Nombre, Telefono, Email) VALUES ($1, $2, $3)",
    [nombre, telefono, email]
  );
};

export const getUser = async (nombre, email) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE Nombre = $1 AND Email = $2",
    [nombre, email]
  );

  return user.rows[0];
};

export const getUserById = async (id) => {  
  const user = await pool.query(
    "SELECT * FROM users WHERE UsuarioID = $1",
    [id]
  );

  return user.rows[0];
}

export const getUserRecipes = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE UsuarioID = $1",
    [userId]
  );
  return result.rows;
}

export const getUserFavorites = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM user_favorites JOIN recipes ON user_favorites.recipe_id = recipes.RecetaID WHERE user_id = $1",
    [userId]
  );
  return result.rows;
}