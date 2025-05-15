const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    nombre: "Menú Test",
    descripcion: "Descripción del menú",
    activo: true,
    creado_por_admin_id: 1,
    modificado_por_admin_id: 1
  };

  try {
    const res = await axios.post(base + '/create_menu', body);
    const id = res.data.id || res.data.id_menu;
    console.log('✔️ Menú creado');

    await axios.get(base + '/read_menu/' + id);
    console.log('✔️ Menú leído');

    await axios.get(base + '/read_menus');
    console.log('✔️ Menús leídos');

    await axios.put(base + '/update_menu/' + id, body);
    console.log('✔️ Menú actualizado');

    await axios.delete(base + '/delete_menu/' + id);
    console.log('✔️ Menú eliminado');
  } catch (err) {
    console.error('❌ Error en menús:', err.response?.data || err.message);
  }
})();
