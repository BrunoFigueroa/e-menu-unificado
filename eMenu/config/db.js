import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proyectobdd",
  password: "postgres",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL Database");
  })
  .catch((error) => {
    console.error(`Connection refuse: ${error}`);
  });

export { pool };
