const carrito = document.querySelector('#carrito');
const listaMuebles = document.querySelector('#productos-hardware');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Listeners
cargarEventListeners();

function cargarEventListeners() {
	console.log("Hola mundo");

	// Dispara cuando se presiona "Agregar Carrito"

	listaMuebles.addEventListener('click', agregarMueble);

	//Cuando se elimina un mueble del carrito
	carrito.addEventListener('click', eliminarMueble);

	//Mostrar los elementos del carrito
	document.addEventListener('DOMContentLoaded', ()=> {
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
		carritoHTML();
	});

	// Al vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funcion que añade el mueble al carrito
function agregarMueble(e){
	// Delegation para agregar-carrito
	e.preventDefault();
	if(e.target.classList.contains('agregar-carrito')) {
		const mueble = e.target.parentElement.parentElement; //Va al class=“card” o class=“contenedor-producto” 
		// Enviamos el mueble seleccionado para tomar sus datos
		leerDatosMueble(mueble);
	}
}

// Lee los datos del mueble}
function leerDatosMueble(mueble) {

	const infoMueble = {
		imagen: mueble.querySelector('.imagen-producto').src,
		titulo: mueble.querySelector('.info-producto').querySelector('.name-producto').textContent,
		precio: mueble.querySelector('.info-producto').querySelector('.precio').textContent,
		id: mueble.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	// Revisa si ya existe un producto en el carrito

	if(articulosCarrito.some( mueble => mueble.id === infoMueble.id)) {
		const muebles = articulosCarrito.map( mueble => {
			if( mueble.id === infoMueble.id ) {
				mueble.cantidad++;
				return mueble;
			} else {
				return mueble;
			}
		})
		articulosCarrito = [...muebles]; // Los 3 puntos son la funcion push para agregar
	} else {
		articulosCarrito = [...articulosCarrito, infoMueble];
	}

	carritoHTML();

}

function eliminarMueble (e) {
	e.preventDefault();

	if(e.target.classList.contains('borrar-mueble')) {
		const muebleId = e.target.getAttribute('data-id');

		// Eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter(mueble => mueble.id!==muebleId);

		carritoHTML();
	}
}

//Muestra el curso seleccionado en el carrito

function carritoHTML() {
	vaciarCarrito();

	articulosCarrito.forEach(mueble => {
		const row = document.createElement('tr');

		row.innerHTML = `
		<td>
			<img src="${mueble.imagen}" width=200>
		</td>

		<td>${mueble.titulo}</td>
		<td>${mueble.precio}</td>
		<td>${mueble.cantidad}</td>
		<td>
			<a href="#" class="borrar-mueble" data-id="${mueble.id}"> X </a>
		</td>
		`;

		console.log(row);
		contenedorCarrito.appendChild(row);
	});

	// Sincronizar con LocalStorage
	sincronizarStorge();
}

function sincronizarStorge() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function vaciarCarrito() {
	// forma lenta
	//contenedorCarrito.innerHTML = '';

	//forma rapida
	while(contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}