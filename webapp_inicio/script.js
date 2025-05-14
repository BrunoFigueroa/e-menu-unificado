// === script.js ===
let contador = 0;
let carrito = [];

function agregarPedido(nombre, precio = 3500) {
  contador++;
  actualizarPedidoBox();

  const productoExistente = carrito.find(item => item.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre: nombre, cantidad: 1, precio: precio });
  }
  renderizarCarrito();
}

function actualizarPedidoBox() {
  const countSpan = document.getElementById('pedido-count');
  if (countSpan) {
    countSpan.textContent = contador;
  }
}

function aumentarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    contador++;
    actualizarPedidoBox();
    renderizarCarrito();
  }
}

function disminuirCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto && producto.cantidad > 0) {
    producto.cantidad--;
    contador--;
    if (producto.cantidad <= 0) {
      eliminarProducto(nombre);
    }
    actualizarPedidoBox();
    renderizarCarrito();
  }
}

function eliminarProducto(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    contador -= producto.cantidad;
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarPedidoBox();
    renderizarCarrito();
  }
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-body");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const nombreSeguro = item.nombre.replace(/'/g, "\\'");

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
        <div>
          <h6 class="mb-1">${item.nombre}</h6>
          <small class="text-muted">Cantidad: ${item.cantidad}</small><br>
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="disminuirCantidad('${nombreSeguro}')">-</button>
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="aumentarCantidad('${nombreSeguro}')">+</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${nombreSeguro}')">Eliminar</button>
        </div>
        <span>$${subtotal.toLocaleString()}</span>
      </div>
    `;
  });

  contenedor.innerHTML += `
    <hr>
    <div class="d-flex justify-content-between">
      <strong>Total:</strong>
      <strong>$${total.toLocaleString()}</strong>
    </div>
    <button class="btn btn-success w-100 mt-3">Finalizar compra</button>
  `;
}

// === Botón categoría ===
function scrollToCategoria(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.getElementById('categoria-panel').style.display = 'none';
  document.getElementById('categoria-toggle').style.display = 'block';
}

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





