$.get("../data/productos.json", function(datos, estado){
	for (const objeto of datos){
		productos.push(new Producto(objeto.id, objeto.nombre, objeto.talle, objeto.precio, objeto.cantidad, objeto.img));
	}	
	ProductoHTML(productos);
});

$(document).ready(function () {
    if('carrito' in localStorage){
        const datos= JSON.parse(localStorage.getItem('carrito'));
        for (const literal of datos) {
            carritoDeCompras.push(new Producto(literal.id, literal.nombre, literal.talle, literal.precio, literal.cantidad, literal.img));
        }
        carritoUI(carritoDeCompras);
        carritoTotal(carritoDeCompras);
    }    
});

$(window).on('load', function (){
	$('#espera').remove();
	$('#stockPadre').fadeIn(1500);
});

$('#finalizarCompra').click(FinalizarCompra);