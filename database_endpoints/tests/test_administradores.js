const axios = require('axios');

(async () => {
  const base = 'http://localhost:3000';

  const body = {
    id_configuracion: 1,
    usuario: "admin_test1",
    contrasena_hash: "hashed_password1",
    nombre_completo: "Admin Test1",
    email: "admin@test.com1"
  };

  try {
    const res = await axios.post(base + '/create_administrador', body);
    const id = res.data.id || res.data.id_administrador;
    console.log('✔️ Administrador creado');

    await axios.get(base + '/read_administrador/' + id);
    console.log('✔️ Administrador leído');

    await axios.get(base + '/read_administradores');
    console.log('✔️ Administradores leídos');

    await axios.put(base + '/update_administrador/' + id, body);
    console.log('✔️ Administrador actualizado');

    await axios.delete(base + '/delete_administrador/' + id);
    console.log('✔️ Administrador eliminado');
  } catch (err) {
    console.error('❌ Error en administradores:', err.response?.data || err.message);
  }
})();
