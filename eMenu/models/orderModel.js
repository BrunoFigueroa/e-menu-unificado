import { pool } from "../config/db.js";

export const createOrder = async (pedido) => {
  const result = await pool.query(
    "INSERT INTO orders (pedido) VALUES ($1) RETURNING orderID",
    [pedido]
  );
  return result.rows[0];
};

export const getOrder = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE orderID = $1", [
    id,
  ]);
  return result.rows[0];
};
