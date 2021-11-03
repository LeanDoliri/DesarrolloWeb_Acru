// HTML Productos en STOCK 

function ProductoHTML (array) {
	$('#stock').empty();
	for (const producto of array){
		$('#stock').append (`<div class="card m-3 e-shop__card--background e-shop__card--animacion e-shop__card--border sombraCont" style="width: 25rem;">
								<img src="${producto.img}" class="card-img-top img-fluid" alt="...">
								<div class="card-body">
								    <h5 class="card-title e-shop__cardTitle--tyf sombraTxt">${producto.nombre}</h5>
								    <p class="card-text e-shop__cardP--tyf sombraTxt">
								    	Talle: ${producto.talle}<br>
								    	Precio: $${producto.precio}
								    </p>
								    <a id='${producto.id}' class="btn e-shop__comprar--animacion e-shop__cardP--btn btnComprarProducto">Comprar</a>
								</div>
							</div>`);								
	}
	$(`.btnComprarProducto`).click(agregarAlCarrito);
}

// Agregar al CARRITO

function agregarAlCarrito(event){
	event.preventDefault();

	const idProducto = event.target.id;

	const seleccionado = carritoDeCompras.find(p => p.id == idProducto);

	if (seleccionado == undefined){
		carritoDeCompras.push(productos.find(p => p.id == idProducto));
	}else{
		seleccionado.agregarCantidad(1);

		carritoTotal(carritoDeCompras);
	}

	carritoUI(carritoDeCompras);

	carritoTotal(carritoDeCompras);

	AlertAgregarAlCarrito();

	localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

// HTML Carrito

function carritoUI(productos){
	let cantidadCarrito = 0;

	for (const producto of carritoDeCompras){
		cantidadCarrito = parseFloat(cantidadCarrito + producto.cantidad);
	}

	$('#cantidadCarrito').html(cantidadCarrito);

	$('#carrito').empty();

	for (const producto of productos){
		$('#carrito').prepend(registroProductoCarrito(producto));
	}

	$('.btnElimarProducto').click(eliminarProductoCarrito);
}

function registroProductoCarrito(producto){
	return `<div class="d-flex justify-content-between align-items-center">
				<div class="m-3">
					<p class="e-shop__productoCarrito--tyf">${producto.nombre}</p>
				</div>
			<div class="d-inline-flex align-items-center">				
				<span class="m-3 p-2 badge btn-warning e-shop__spanCarrito--tyf">Cantidad: ${producto.cantidad}</span>											
				<span class="m-3 p-2 badge btn-success e-shop__spanCarrito--tyf">$${producto.subtotal()}</span>
				<button id="${producto.id}" class="btn btn-danger m-3 btnElimarProducto">
					<img src="../assets/images/cesto.png" width="15" class="m-0 p-0">
				</button>										
			</div>`
}

// Eliminar Producto del Carrito
function eliminarProductoCarrito(event){
	event.preventDefault();
	event.stopPropagation();

	let repetido = carritoDeCompras.find(productoR => productoR.id == event.target.id);
	repetido.cantidad = 1;

	carritoDeCompras = carritoDeCompras.filter(producto => producto.id != event.target.id);

	carritoUI(carritoDeCompras);

	carritoTotal(carritoDeCompras);

	AlertEliminarDelCarrito();

	localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

function RecuperarCarrito (){
	let carritoRecuperado = JSON.parse(localStorage.getItem('carrito'));
	if(carritoRecuperado){
		carritoRecuperado.forEach(el => {
			agregarAlCarrito(el.id)
		});
	}
}

// Precio total CARRITO

function carritoTotal (productos) {
	let precioTotal = 0;

	for (const producto of productos){
		precioTotal = parseFloat(precioTotal + producto.subtotal());
	}

	$('#precioTotal').html(`Total: $${precioTotal}`);	
}

// Alert Agregar al Carrito

function AlertAgregarAlCarrito(){
	Toastify({
		text: `Producto agregado al Carrito`,
		className: "info",
		position: "center",
		style: {
	    background: "#0099cc",
	    color: "white",
	    fontFamily: "Lexend",
	    fontSize: "2rem",
	    fontWeight: "400",
	    boxShadow: "1px 1px 10px black",
		}
	}).showToast();
}

// Alert Eliminar del Carrito

function AlertEliminarDelCarrito(){
	Toastify({
		text: `Producto eliminado`,
		className: "info",
		position: "center",
		style: {
	    background: "#660033",
	    color: "white",
	    fontFamily: "Lexend",
	    fontSize: "2rem",
	    fontWeight: "400",
	    boxShadow: "1px 1px 10px black",
		}
	}).showToast();
}

// Finalizar Compra
function FinalizarCompra(){
	$.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(carritoDeCompras));

	carritoDeCompras = [];

	$('#carrito').empty();	
	$('#prodsCarritoDropdown').empty();

	carritoUI(carritoDeCompras);
	carritoTotal(carritoDeCompras);

	localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

