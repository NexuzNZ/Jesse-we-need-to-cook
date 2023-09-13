//Variables
const carrito=document.querySelector('#carrito');
const listaMuebles=document.querySelector('#lista-muebles');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
let articulosCarrito=[];

//Listeners
cargarEventListeners();

function cargarEventListeners() {
	//Dispara cuando se presiona "Agregar carrito"
	listaMuebles.addEventListener('click', agregarMueble);

	//Cuando se elimina un mueble del carrito
	carrito.addEventListener('click', eliminarMueble);

	//Mostrar los elementos del carrito
	//Local Storage=base de datos provisional de la página
	
	/*document.addEventListener('DOMContentLoaded', ()=>{
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
		carritoHTML;
	});*/

	//Al vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

//e=Evento
function agregarMueble(e){
	//Delegation para agregar-carrito
	e.preventDefault();
	//e.preventDefault es para queno borre o reinicie los datos 
	if(e.target.classList.contains('agregar-carrito')){
		const mueble=e.target.parentElement.parentElement;
		//Target=Objetivo, a quien apunta
		//Enviamos el mueble seleccionado para tomar sus datos
		leerDatosMueble(mueble); 
	}
}

//Lee los datos del mueble
function leerDatosMueble(mueble){
	const infoMueble = {
		//src=Dirección donde se encuentra la imagen requerida
		imagen: mueble.querySelector('img').src,
		titulo: mueble.querySelector('h3').textContent,
		precio: mueble.querySelector('.precio').textContent,
		id: mueble.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	//Revisa si ya existe el producto en el carrito
	if(articulosCarrito.some(mueble => mueble.id === infoMueble.id)){
		const muebles = articulosCarrito.map(mueble =>{
			//===: Me indica una igualdad más estricta
			if(mueble.id === infoMueble.id){
				mueble.cantidad++;
				return mueble;
			}
			else{
				return mueble;
			}
		})
		//...=push en el arreglo
		articulosCarrito=[...muebles];
	}
	else{
		articulosCarrito=[...articulosCarrito,infoMueble];
	}

	//console.log(articulosCarrito)

	carritoHTML();
}

//Elimina el mueble del carrito en el DOM

function eliminarMueble(e) {
	e.preventDefault();

	if(e.target.classList.contains('borrar-mueble')){
		//e.target.parentElement.parentElement.remove();
		const muebleId = e.target.getAttribute('data-id');

		//Eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter(mueble => mueble.id!==muebleId);
		carritoHTML();
	}
}

//Muestra el curso seleccionado en el carrito
function carritoHTML(){
	vaciarCarrito();

	articulosCarrito.forEach(mueble =>{
		const row=document.createElement('tr');
		
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

	//Sincronizar con LocalStorage
	//sincronizarStorge();
}

//Elimina los cursos del carrito en el DOM

function vaciarCarrito(){
	//forma lenta
	//contenedorCarrito.innerHTML = '';

	//Forma rápida (recomendada)
	while(contenedorCarrito.firstChild){
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}