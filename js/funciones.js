// HTML Agregar Prodcutos nuevos al Stock

$('#formAgregarProducto').submit(function (e){
	e.preventDefault();

	let imgs = 'assets/imgs/tshirt_man.jpg';

	let inputs = formAgregarProducto.children;
	productos.push(new Producto((productos.length) + 1, inputs[0].value, inputs[1].value, inputs[2].value, 1, imgs));

	$('#stock').empty();

	ProductoHTML(productos);
});

// HTML Productos en STOCK 

function ProductoHTML (array) {
	$('#stock').empty();
	for (const producto of array){
		$('#stock').append (`<div class="card m-1" style="width: 15rem;">
								  <img src= ${producto.img} class="card-img-top img-fluid" alt="...">
								  <div class="card-body">
								    <h5 class="card-title">${producto.nombre}</h5>
								    <hr>
								    <p class="card-text">
								    	ID: ${producto.id}<br>
								    	Talle: ${producto.talle}<br>
								    	Precio: $${producto.precio}
								    </p>
								    <a id='btnCompra${producto.id}' class="btn btn-primary btnCompra">COMPRAR</a>
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
		$(`#cantidad${repetido.id}`).html (`<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`);

		carritoTotal();

		let productoCarrito = productos.find(prod => prod.id == id);
		carritoDeCompras.push(productoCarrito);

	}else{
		let productoCarrito = productos.find(prod => prod.id == id);

		carritoDeCompras.push(productoCarrito);

		ActualizarCarritoDropdwn();

		$('#carrito').prepend(`<div class="card m-1" style="width: 15rem;" id=prodCarrito${productoCarrito.id}>
								  <img src= '${productoCarrito.img}' class="card-img-top img-fluid" alt="...">
								  <div class="card-body">
								    <h5 class="card-title">${productoCarrito.nombre}</h5>
								    <hr>
								    <p class="card-text">								    	
								    	Talle: ${productoCarrito.talle}<br>
								    	Precio: $${productoCarrito.precio}
								    	<p id="cantidad${productoCarrito.id}">Cantidad: ${productoCarrito.cantidad}</p>	
								    </p>								    
								  </div>
								  <a id='btnEliminarCarrito${productoCarrito.id}' class="btn btn-primary">Eliminar</a>
								</div>`);

		carritoTotal();

		$(`#btnEliminarCarrito${productoCarrito.id}`).click(function (){
			AlertEliminarDelCarrito()

			let repetido = carritoDeCompras.find(productoR => productoR.id == id);
			repetido.cantidad = 1;		

			$(`#prodCarrito${productoCarrito.id}`).slideUp(1000);

			carritoDeCompras = carritoDeCompras.filter(el => el.id != productoCarrito.id);

			carritoTotal();

			ActualizarCarritoDropdwn();

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

function ActualizarCarritoDropdwn (){
	$('#cantidadCarritoDropdown').html(carritoDeCompras.length);

	$('#prodsCarritoDropdown').empty();

	for (const producto of carritoDeCompras){
		$('#prodsCarritoDropdown').prepend(`<p class='ml-1'><strong>${producto.nombre}</strong> - $${producto.precio}</p>`)
	}
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
	ActualizarCarritoDropdwn();
}

