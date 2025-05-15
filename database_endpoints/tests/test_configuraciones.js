const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    clave: "clave_test",
    valor: "valor_test"
  };

  try {
    const res = await axios.post(base + '/create_configuracion', body);
    const id = res.data.id || res.data.id_configuracion;
    console.log('✔️ Configuración creada');

    await axios.get(base + '/read_configuracion/' + id);
    console.log('✔️ Configuración leída');

    await axios.get(base + '/read_configuraciones');
    console.log('✔️ Configuraciones leídas');

    await axios.put(base + '/update_configuracion/' + id, body);
    console.log('✔️ Configuración actualizada');

    await axios.delete(base + '/delete_configuracion/' + id);
    console.log('✔️ Configuración eliminada');
  } catch (err) {
    console.error('❌ Error en configuraciones:', err.response?.data || err.message);
  }
})();
