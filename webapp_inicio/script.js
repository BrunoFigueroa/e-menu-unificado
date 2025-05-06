// === script.js ===
let contador = 0;

function agregarPedido() {
  contador++;
  let box = document.getElementById('pedido-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'pedido-box';
    box.className = 'pedido-box';
    box.innerHTML = `
      <i class="fas fa-shopping-cart"></i>
      <span id="pedido-count">${contador}</span>
      <button class="btn btn-light btn-sm">Ver pedido</button>
    `;
    document.body.appendChild(box);
  } else {
    document.getElementById('pedido-count').textContent = contador;
  }
}

function scrollToCategoria(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.getElementById('categoria-panel').style.display = 'none';
  document.getElementById('categoria-toggle').style.display = 'block';
}

// Mostrar botón de categoría solo en la sección del menú
window.addEventListener('scroll', () => {
  const menuSection = document.getElementById('menu');
  const toggleBtn = document.getElementById('categoria-toggle');
  const rect = menuSection.getBoundingClientRect();

  if (rect.top <= 100 && rect.bottom > 100) {
    toggleBtn.style.display = 'block';
  } else {
    toggleBtn.style.display = 'none';
    document.getElementById('categoria-panel').style.display = 'none';
  }
});

document.getElementById('categoria-toggle').addEventListener('click', () => {
  document.getElementById('categoria-panel').style.display = 'block';
  document.getElementById('categoria-toggle').style.display = 'none';
});
