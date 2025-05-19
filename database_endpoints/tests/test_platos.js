const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    id_categoria: 1,
    nombre: "Plato Test",
    precio: 1000,
    descripcion: "Descripción",
    tiempo_estimado: 10,
    imagen_url: "http://img.jpg",
    disponible: true,
    creado_por_admin_id: 1,
    modificado_por_admin_id: 1
  };

  try {
    const res = await axios.post(base + '/create_plato', body);
    const id = res.data.id || res.data.id_plato;
    console.log('✔️ Plato creado');

    await axios.get(base + '/read_plato/' + id);
    console.log('✔️ Plato leído');

    await axios.get(base + '/read_platos');
    console.log('✔️ Platos leídos');

    await axios.put(base + '/update_plato/' + id, body);
    console.log('✔️ Plato actualizado');

    await axios.delete(base + '/delete_plato/' + id);
    console.log('✔️ Plato eliminado');
  } catch (err) {
    console.error('❌ Error en platos:', err.response?.data || err.message);
  }
})();
