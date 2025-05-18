const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


const app = express();
const port = 8080;

const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'emenu4',
  password: 'contrasena',
  port: 5432,
});

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);



app.get('/', (req, res) => {
  res.send('Hello world! (si esto no aparece, hay un problema con express)');
});

// ping para testear conexion.
app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Conexión exitosa: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de conexión a la base de datos');
  }
});

// Operaciones CRUD para todas las tablas.

// Platos:
app.post('/create_plato', async (req, res) => {
  const {
    id_categoria,
    nombre,
    precio,
    descripcion,
    tiempo_estimado,
    imagen_url,
    disponible,
    creado_por_admin_id,
    modificado_por_admin_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Platos (
        id_categoria, nombre, precio, descripcion, tiempo_estimado,
        imagen_url, disponible, creado_por_admin_id, modificado_por_admin_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        id_categoria,
        nombre,
        precio,
        descripcion,
        tiempo_estimado,
        imagen_url,
        disponible,
        creado_por_admin_id,
        modificado_por_admin_id
      ]
    );
   res.json({
  success: true,
  data: result.rows[0],
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_plato/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM Platos WHERE id_plato = $1',
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_platos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM Platos'
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_plato/:id', async (req, res) => {
  const {
    id_categoria,
    nombre,
    precio,
    descripcion,
    tiempo_estimado,
    imagen_url,
    disponible,
    creado_por_admin_id,
    modificado_por_admin_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Platos SET
        id_categoria = $2,
        nombre = $3,
        precio = $4,
        descripcion = $5,
        tiempo_estimado = $6,
        imagen_url = $7,
        disponible = $8,
        creado_por_admin_id = $9,
        modificado_por_admin_id = $10
      WHERE id_plato = $1 RETURNING *`,
      [
        req.params.id,
        id_categoria,
        nombre,
        precio,
        descripcion,
        tiempo_estimado,
        imagen_url,
        disponible,
        creado_por_admin_id,
        modificado_por_admin_id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_plato/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Platos WHERE id_plato = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Configuracion restaurante CRUD
app.post('/create_configuracion', async (req, res) => {
  const { nombre_restaurante, direccion, url_qr, otros_detalles } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Configuracion_restaurante (nombre_restaurante, direccion, url_qr, otros_detalles)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre_restaurante, direccion, url_qr, otros_detalles]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_configuracion/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM Configuracion_restaurante WHERE id_configuracion = $1',
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_configuraciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Configuracion_restaurante');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_configuracion/:id', async (req, res) => {
  const { nombre_restaurante, direccion, url_qr, otros_detalles } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Configuracion_restaurante
       SET nombre_restaurante = $2, direccion = $3, url_qr = $4, otros_detalles = $5
       WHERE id_configuracion = $1 RETURNING *`,
      [req.params.id, nombre_restaurante, direccion, url_qr, otros_detalles]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_configuracion/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Configuracion_restaurante WHERE id_configuracion = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// administradores CRUD
app.post('/create_administrador', async (req, res) => {
  const { id_configuracion, usuario, contrasena_hash, nombre_completo, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Administradores (id_configuracion, usuario, contrasena_hash, nombre_completo, email)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_configuracion, usuario, contrasena_hash, nombre_completo, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_administrador/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Administradores WHERE id_administrador = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_administradores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Administradores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_administrador/:id', async (req, res) => {
  const { id_configuracion, usuario, contrasena_hash, nombre_completo, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Administradores SET id_configuracion = $2, usuario = $3, contrasena_hash = $4,
        nombre_completo = $5, email = $6 WHERE id_administrador = $1 RETURNING *`,
      [req.params.id, id_configuracion, usuario, contrasena_hash, nombre_completo, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_administrador/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Administradores WHERE id_administrador = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// metricas CRUD
app.post('/create_metrica', async (req, res) => {
  const { id_configuracion, fecha_hora, tipo_metrica, descripcion } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Metricas (id_configuracion, fecha_hora, tipo_metrica, descripcion)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_configuracion, fecha_hora, tipo_metrica, descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_metrica/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Metricas WHERE id_metrica = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_metricas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Metricas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_metrica/:id', async (req, res) => {
  const { id_configuracion, fecha_hora, tipo_metrica, descripcion } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Metricas SET id_configuracion = $2, fecha_hora = $3, tipo_metrica = $4,
        descripcion = $5 WHERE id_metrica = $1 RETURNING *`,
      [req.params.id, id_configuracion, fecha_hora, tipo_metrica, descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_metrica/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Metricas WHERE id_metrica = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// menus CRUD
app.post('/create_menu', async (req, res) => {
  const { nombre, descripcion, activo, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Menus (nombre, descripcion, activo, creado_por_admin_id, modificado_por_admin_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, activo, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_menu/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Menus WHERE id_menu = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Menus');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_menu/:id', async (req, res) => {
  const { nombre, descripcion, activo, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Menus SET nombre = $2, descripcion = $3, activo = $4,
        creado_por_admin_id = $5, modificado_por_admin_id = $6
       WHERE id_menu = $1 RETURNING *`,
      [req.params.id, nombre, descripcion, activo, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_menu/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Menus WHERE id_menu = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// estados pedido CRUD
app.post('/create_estado', async (req, res) => {
  const { nombre_estado, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Estados_pedido (nombre_estado, creado_por_admin_id, modificado_por_admin_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre_estado, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_estado/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Estados_pedido WHERE id_estado_pedido = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_estados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Estados_pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_estado/:id', async (req, res) => {
  const { nombre_estado, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Estados_pedido SET nombre_estado = $2,
        creado_por_admin_id = $3, modificado_por_admin_id = $4
       WHERE id_estado_pedido = $1 RETURNING *`,
      [req.params.id, nombre_estado, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_estado/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Estados_pedido WHERE id_estado_pedido = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// categorias CRUD
app.post('/create_categoria', async (req, res) => {
  const { id_menu, nombre, orden, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Categorias (id_menu, nombre, orden, creado_por_admin_id, modificado_por_admin_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_menu, nombre, orden, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_categoria/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Categorias WHERE id_categoria = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Categorias');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_categoria/:id', async (req, res) => {
  const { id_menu, nombre, orden, creado_por_admin_id, modificado_por_admin_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Categorias SET id_menu = $2, nombre = $3, orden = $4,
        creado_por_admin_id = $5, modificado_por_admin_id = $6
       WHERE id_categoria = $1 RETURNING *`,
      [req.params.id, id_menu, nombre, orden, creado_por_admin_id, modificado_por_admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_categoria/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Categorias WHERE id_categoria = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// pedidos CRUD
app.post('/create_pedido', async (req, res) => {
  const { fecha_hora, mesa, id_estado_pedido, tiempo_espera_pedido, tiempo_espera_actualizado, comentarios } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Pedidos (fecha_hora, mesa, id_estado_pedido, tiempo_espera_pedido, tiempo_espera_actualizado, comentarios)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [fecha_hora, mesa, id_estado_pedido, tiempo_espera_pedido, tiempo_espera_actualizado, comentarios]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_pedido/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Pedidos WHERE id_pedido = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Pedidos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_pedido/:id', async (req, res) => {
  const { fecha_hora, mesa, id_estado_pedido, tiempo_espera_pedido, tiempo_espera_actualizado, comentarios } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Pedidos SET fecha_hora = $2, mesa = $3, id_estado_pedido = $4,
        tiempo_espera_pedido = $5, tiempo_espera_actualizado = $6, comentarios = $7
       WHERE id_pedido = $1 RETURNING *`,
      [req.params.id, fecha_hora, mesa, id_estado_pedido, tiempo_espera_pedido, tiempo_espera_actualizado, comentarios]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_pedido/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Pedidos WHERE id_pedido = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// detalles pedido CRUD
app.post('/create_detalle_pedido', async (req, res) => {
  const { id_pedido, id_plato, cantidad, notas } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Detalles_pedido (id_pedido, id_plato, cantidad, notas)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_pedido, id_plato, cantidad, notas]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_detalle_pedido/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Detalles_pedido WHERE id_detalle = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read_detalles_pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Detalles_pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update_detalle_pedido/:id', async (req, res) => {
  const { id_pedido, id_plato, cantidad, notas } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Detalles_pedido SET id_pedido = $2, id_plato = $3, cantidad = $4, notas = $5
       WHERE id_detalle = $1 RETURNING *`,
      [req.params.id, id_pedido, id_plato, cantidad, notas]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete_detalle_pedido/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Detalles_pedido WHERE id_detalle = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

