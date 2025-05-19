import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createPlato } from '@/network/api/plato_prueba/create_plato';

interface FormData {
  id_categoria: string;
  nombre: string;
  precio: string;
  descripcion: string;
  tiempo_estimado: string;
  imagen_url: string;
  disponible: boolean;
  creado_por_admin_id: string;
  modificado_por_admin_id: string;
}

const CrearPlato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id_categoria: '',
    nombre: '',
    precio: '',
    descripcion: '',
    tiempo_estimado: '',
    imagen_url: '',
    disponible: true,
    creado_por_admin_id: '',
    modificado_por_admin_id: '',
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const key = name as keyof FormData;
    setFormData((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        id_categoria: parseInt(formData.id_categoria),
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        descripcion: formData.descripcion,
        tiempo_estimado: formData.tiempo_estimado,
        imagen_url: formData.imagen_url,
        disponible: formData.disponible,
        creado_por_admin_id: parseInt(formData.creado_por_admin_id),
        modificado_por_admin_id: parseInt(formData.modificado_por_admin_id),
      };

      const result = await createPlato(payload);

      if (result.success) {
        setMensaje(`✅ Plato "${result.data.nombre}" creado con éxito (ID: ${result.data.id_plato})`);
        setFormData({
          id_categoria: '',
          nombre: '',
          precio: '',
          descripcion: '',
          tiempo_estimado: '',
          imagen_url: '',
          disponible: true,
          creado_por_admin_id: '',
          modificado_por_admin_id: '',
        });
      } else {
        setMensaje(`❌ Error: No se pudo crear el plato`);
      }
    } catch (error) {
      console.error(error);
      setMensaje('🚨 Error de conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear nuevo plato</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="id_categoria" placeholder="ID Categoría" value={formData.id_categoria} onChange={handleChange} required />
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="number" step="0.01" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
        <input type="text" name="tiempo_estimado" placeholder="Tiempo estimado" value={formData.tiempo_estimado} onChange={handleChange} required />
        <input type="text" name="imagen_url" placeholder="URL de imagen" value={formData.imagen_url} onChange={handleChange} required />
        <label>
          Disponible:
          <input type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange} />
        </label>
        <input type="text" name="creado_por_admin_id" placeholder="ID Admin creador" value={formData.creado_por_admin_id} onChange={handleChange} required />
        <input type="text" name="modificado_por_admin_id" placeholder="ID Admin modificador" value={formData.modificado_por_admin_id} onChange={handleChange} required />
        <button type="submit">Crear Plato</button>
      </form>
    </div>
  );
};

export default CrearPlato;
