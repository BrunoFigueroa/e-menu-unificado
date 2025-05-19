const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    fecha_hora: new Date().toISOString(),
    mesa: 1,
    id_estado_pedido: 1,
    tiempo_espera_pedido: 1,
    tiempo_espera_actualizado: 1,
    comentarios: 'test_pedido'
  };

  try {
    const res = await axios.post(base + '/create_pedido', body);
    const id = res.data.id_pedido;
    console.log('✔️ Pedido creado');

    await axios.get(base + '/read_pedido/' + id);
    console.log('✔️ Pedido leído');

    await axios.get(base + '/read_pedidos');
    console.log('✔️ Pedidos leídos');

    await axios.put(base + '/update_pedido/' + id, body);
    console.log('✔️ Pedido actualizado');

    await axios.delete(base + '/delete_pedido/' + id);
    console.log('✔️ Pedido eliminado');
  } catch (err) {
    console.error('❌ Error en pedidos:', err.response?.data || err.message);
  }
})();
