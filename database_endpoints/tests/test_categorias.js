const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    id_menu: 1,
    nombre: "Categoría Test",
    descripcion: "Prueba",
    imagen_url: "http://cat.jpg"
  };

  try {
    const res = await axios.post(base + '/create_categoria', body);
    const id = res.data.id || res.data.id_categoria;
    console.log('✔️ Categoría creada');

    await axios.get(base + '/read_categoria/' + id);
    console.log('✔️ Categoría leída');

    await axios.get(base + '/read_categorias');
    console.log('✔️ Categorías leídas');

    await axios.put(base + '/update_categoria/' + id, body);
    console.log('✔️ Categoría actualizada');

    await axios.delete(base + '/delete_categoria/' + id);
    console.log('✔️ Categoría eliminada');
  } catch (err) {
    console.error('❌ Error en categorías:', err.response?.data || err.message);
  }
})();
