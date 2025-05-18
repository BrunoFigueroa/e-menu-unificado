import { useMenuDelDia } from "@/hooks/useMenuDelDia";

const MenuDelDia = () => {
  const { menu, cargando, huboError, mensajeError } = useMenuDelDia();

  if (cargando) return <p>Cargando menú del día...</p>;
  if (huboError) return <p>Error: {mensajeError}</p>;

  return (
    <div>
      <h2>Menú del día - {menu?.dia.toUpperCase()}</h2>
      <ul>
        {menu?.platos.map((plato, index) => (
          <li key={index}>
            {plato.nombre} - ${plato.precio.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDelDia;
