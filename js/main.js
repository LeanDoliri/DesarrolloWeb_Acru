$.get("../data/productos.json", function(respuesta, estado){
	for (const objeto of respuesta){
		productos.push(new Producto(objeto.id, objeto.nombre, objeto.talle, objeto.precio, objeto.cantidad, objeto.img));
	}		
});

$(document).ready(function (){
	ProductoHTML(productos);	
});

$(window).on('load', function (){
	$('#espera').remove();
	$('#stockPadre').fadeIn(1500);
	RecuperarCarrito ();
});

CategoriasFiltro(talle,'#filtroTalle');

$('#filtroTalle').change(FiltrarTalle);

$('#finalizarCompra').click(FinalizarCompra);
