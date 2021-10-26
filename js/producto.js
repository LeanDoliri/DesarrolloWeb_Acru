// Clase Producto

class Producto{
	constructor (id, nombre, talle, precio, cantidad, img){
		this.id = id;
		this.nombre = nombre.toUpperCase();
		this.talle = talle;
		this.precio = parseFloat(precio);
		this.cantidad = parseInt(cantidad);
		this.img = img;
	}

	agregarCantidad(valor){
		this.cantidad += valor;
	}

	subtotal(){
		return this.cantidad * this.precio;
	}
}