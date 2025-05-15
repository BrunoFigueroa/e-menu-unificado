const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    id_pedido: 1,
    id_plato: 1,
    cantidad: 2,
    notas: "sin cebolla"
  };

  try {
    const res = await axios.post(base + '/create_detalle_pedido', body);
    const id = res.data.id || res.data.id_detalle;
    console.log('✔️ Detalle pedido creado');

    await axios.get(base + '/read_detalle_pedido/' + id);
    console.log('✔️ Detalle pedido leído');

    await axios.get(base + '/read_detalles_pedidos');
    console.log('✔️ Detalles pedidos leídos');

    await axios.put(base + '/update_detalle_pedido/' + id, body);
    console.log('✔️ Detalle pedido actualizado');

    await axios.delete(base + '/delete_detalle_pedido/' + id);
    console.log('✔️ Detalle pedido eliminado');
  } catch (err) {
    console.error('❌ Error en detalles pedidos:', err.response?.data || err.message);
  }
})();
