$.get("../data/productos.json", function(datos, estado){
	console.log(datos);
	console.log(estado);
	if (estado == 'success'){
		for (const objeto of respuesta){
			productos.push(new Producto(objeto.id, objeto.nombre, objeto.talle, objeto.precio, objeto.cantidad, objeto.img));
		}
		console.log(productos)		
		ProductoHTML(productos);
	}else{
		console.log('No se cargaron los datos')
	}
});

$(window).on('load', function (){
	$('#espera').remove();
	$('#stockPadre').fadeIn(1500);
	RecuperarCarrito ();
});

CategoriasFiltro(talle,'#filtroTalle');

$('#filtroTalle').change(FiltrarTalle);

$('#finalizarCompra').click(FinalizarCompra);