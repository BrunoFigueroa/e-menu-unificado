const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    id_configuracion: 1,
    fecha_hora: new Date().toISOString(),
    tipo_metrica: "Clicks",
    descripcion: "Metric test"
  };

  try {
    const res = await axios.post(base + '/create_metrica', body);
    const id = res.data.id || res.data.id_metrica;
    console.log('✔️ Métrica creada');

    await axios.get(base + '/read_metrica/' + id);
    console.log('✔️ Métrica leída');

    await axios.get(base + '/read_metricas');
    console.log('✔️ Métricas leídas');

    await axios.put(base + '/update_metrica/' + id, body);
    console.log('✔️ Métrica actualizada');

    await axios.delete(base + '/delete_metrica/' + id);
    console.log('✔️ Métrica eliminada');
  } catch (err) {
    console.error('❌ Error en métricas:', err.response?.data || err.message);
  }
})();
