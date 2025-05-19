import { Pool } from "pg";

const pool = new Pool({ // aca debe configurar con los parametros de su base de datos local psql
  user: "postgres",
  host: "localhost",
  database: "emenu4",
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
