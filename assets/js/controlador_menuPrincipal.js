var Categorias;
var orden = '';
function menuPrin() {
    document.getElementById('menuPrincipal').style.display = "block";
    document.getElementById('menuCategoria').style.display = "none";
    renderizarCategorias();
 }
 menuPrin()

async function renderizarCategorias() {
    var c = 0;
    const respuesta = await fetch("http://127.0.0.1:3002/categorias", {
		method: "get",
	});
	Categorias = await respuesta.json();
    document.getElementById('categorias').innerHTML='';
    Categorias.forEach(Categoria => {
        document.getElementById('categorias').innerHTML+=
        ` <div id="menu" onclick="menuCategoria(${c})"><img class="imgMenu" src="/assets/img/${Categoria.imgCategorias} " alt=""><p>${Categoria.nombreCategoria} </p></div>`
        ;c++
    });
}

function menuCategoria(idCategoria) {
var productos = Categorias[idCategoria].productos;
document.getElementById('productos').innerHTML = '';
var c = 0; 
productos.forEach(producto => {
    document.getElementById('productos').innerHTML += 
        `<div class="contProducto">
        <img class="imgProduc" src="/assets/img/productos/${producto.imgProducto}" alt="">
        <div>
            <div class="informacionProducto">
                <h4 class="tituloProduc">${producto.nombreProducto}</h4>
                <p class="texto">${producto.descripcion}</p>
            </div>
            <div class="precio">
                <p class="texto">LPS.${producto.precio}</p>
                <div class="cantidad"> 
                    <p class="texto">CANTIDAD: </p>
                    <i class="fa-solid fa-circle-plus" onclick="agregar(${c})"></i>
                    <p class="texto" id ="valor${c}"> 0 </p>
                    <i class="fa-solid fa-circle-minus" onclick="disminuir(${c})"></i>
                </div>
            </div>
        </div>
        <button id="Ordenar" onclick="ordenar(${c}, ${idCategoria})"> Ordenar</button>
        </div>`; c++
});
document.getElementById('menuPrincipal').style.display = "none";
document.getElementById('menuCategoria').style.display = "block";
}

function ordenar(c, idCategoria) {
    var valor = parseInt(document.getElementById(`valor${c}`).innerHTML);
    var producto = Categorias[idCategoria].productos[c];
    console.log(producto, valor);
}
// Función para agregar valor
function agregar(c) {
    var valor = document.getElementById(`valor${c}`);
    valor.innerHTML = parseInt(valor.innerHTML) + 1;
}

// Función para disminuir valor
function disminuir(c) {
    var valor = document.getElementById(`valor${c}`);
    if(parseInt(valor.innerHTML) > 0){
        valor.innerHTML = parseInt(valor.innerHTML) - 1;
    }
}