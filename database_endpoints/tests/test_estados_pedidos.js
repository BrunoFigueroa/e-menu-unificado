const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    nombre_estado: "Pendiente",
    creado_por_admin_id: 1,
    modificado_por_admin_id: 1
  };

  try {
    const res = await axios.post(base + '/create_estado', body);
    const id = res.data.id || res.data.id_estado_pedido;
    console.log('✔️ Estado pedido creado');

    await axios.get(base + '/read_estado/' + id);
    console.log('✔️ Estado leído');

    await axios.get(base + '/read_estados');
    console.log('✔️ Estados leídos');

    await axios.put(base + '/update_estado/' + id, body);
    console.log('✔️ Estado actualizado');

    await axios.delete(base + '/delete_estado/' + id);
    console.log('✔️ Estado eliminado');
  } catch (err) {
    console.error('❌ Error en estados pedidos:', err.response?.data || err.message);
  }
})();
