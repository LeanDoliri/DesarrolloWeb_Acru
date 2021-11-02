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
								    <a id='btnCompra${producto.id}' class="btn e-shop__comprar--animacion e-shop__cardP--btn">Comprar</a>
								</div>
							</div>`);
								
		$(`#btnCompra${producto.id}`).click(function (){
			agregarAlCarrito(producto.id);
			AlertAgregarAlCarrito()
		});
	}
}

// HTML Agregar al CARRITO

function agregarAlCarrito (id){	

	let repetido = carritoDeCompras.find(productoR => productoR.id == id);

	if (repetido){
		repetido.cantidad = repetido.cantidad + 1;		
		$(`#cantidad${repetido.id}`).html (
				`<div id="cantidad${repetido.id}">
					<span class="m-3 p-2 badge btn-warning e-shop__spanCarrito--tyf">Cantidad: ${repetido.cantidad}</span>
				</div>`
			);			

		carritoTotal();

		let productoCarrito = productos.find(prod => prod.id == id);
		carritoDeCompras.push(productoCarrito);

	}else{
		let productoCarrito = productos.find(prod => prod.id == id);

		carritoDeCompras.push(productoCarrito);		

		$('#carrito').prepend(`<div id=prodCarrito${productoCarrito.id} class="d-flex justify-content-between align-items-center">
									<div>
										<p class="m-3 e-shop__productoCarrito--tyf">${productoCarrito.nombre}</p>
									</div>
									<div class="d-inline-flex align-items-center">
										<div id="cantidad${productoCarrito.id}">
											<span class="m-3 p-2 badge btn-warning e-shop__spanCarrito--tyf">Cantidad: ${productoCarrito.cantidad}</span>
										</div>												
										<span class="m-3 p-2 badge btn-success e-shop__spanCarrito--tyf">$${productoCarrito.precio}</span>
											<button id='btnEliminarCarrito${productoCarrito.id}' class="btn btn-danger m-3">
												<img src="../assets/images/cesto.png" width="15" alt="">
											</button>
										</div>											
									</div>`);

		carritoTotal();

		ActualizarCarrito();

		$(`#btnEliminarCarrito${productoCarrito.id}`).click(function (e){			
			// AlertEliminarDelCarrito();

			event.preventDefault();

			let repetidoEliminarCarrito = carritoDeCompras.find(productoR => productoR.id == id);
			repetidoEliminarCarrito.cantidad = 1;			

			carritoDeCompras = carritoDeCompras.filter(el => el.id != productoCarrito.id);

			// carritoTotal();

			ActualizarCarrito();

			localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
		});
	}
	localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

// Recuperar Carrito

function RecuperarCarrito (){
	let carritoRecuperado = JSON.parse(localStorage.getItem('carrito'));
	if(carritoRecuperado){
		carritoRecuperado.forEach(el => {
			agregarAlCarrito(el.id)
		});
	}
}

// Precio total CARRITO

function carritoTotal () {
	let precioTotal = carritoDeCompras.reduce((acc, el)=> acc + (el.precio * el.cantidad), 0);

	$('#precioTotal').html(precioTotal);	
}

// Actualizar Carrito Dropdown

function ActualizarCarrito (){
	$('#cantidadCarrito').html(carritoDeCompras.length);

	$('#carrito').empty();

	for (const producto of carritoDeCompras){
			$('#carrito').prepend(`<div id=prodCarrito${producto.id} class="d-flex justify-content-between align-items-center">
										<div>
											<p class="m-3 e-shop__productoCarrito--tyf">${producto.nombre}</p>
										</div>
										<div class="d-inline-flex align-items-center">
											<div id="cantidad${producto.id}">
												<span class="m-3 p-2 badge btn-warning e-shop__spanCarrito--tyf">Cantidad: ${producto.cantidad}</span>
											</div>												
											<span class="m-3 p-2 badge btn-success e-shop__spanCarrito--tyf">$${producto.precio}</span>
											<button id='btnEliminarCarrito${producto.id}' type="button" class="btn btn-danger m-3">
												<img src="../assets/images/cesto.png" width="15" alt="">
											</button>
										</div>											
									</div>`);}
}

// Alert Agregar al Carrito

function AlertAgregarAlCarrito(){
	$('#alertProductoAgregado').slideDown('slow').delay(1000).slideUp();
}

// Alert Eliminar del Carrito

function AlertEliminarDelCarrito(){
	$('#alertProductoEliminado').slideDown('slow').delay(1000).slideUp();
}

// Filtro

function CategoriasFiltro (lista, selector){
	$(selector).empty();
	for (const talle of lista){
		$(selector).append(`<option>${talle}</option>`);
	}
	$(selector).prepend(`<option selected>Todos</option>`);
}

function FiltrarTalle (){
	let valor = this.value;

	$('#stock').fadeOut('fast', function(){ 
		if(valor != "Todos"){
			let filtrados = productos.filter(producto => producto.talle == valor);
			ProductoHTML(filtrados);
		}else {
			ProductoHTML(productos);
		}
	}).fadeIn('fast');
}

// Finalizar Compra
function FinalizarCompra(){
	$.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(carritoDeCompras));
	carritoDeCompras = [];
	$('#carrito').empty();
	$('#prodsCarritoDropdown').empty();
	carritoTotal();
	// ActualizarCarritoDropdwn();
}

