var Categorias;
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
                    <i class="fa-solid fa-circle-plus" onclick="cantProducto(-1)"></i>
                    <p class="texto" id ="cantidad "></p>
                    <i class="fa-solid fa-circle-minus" onclick="cantProducto(1)"></i>
                </div>
            </div>
        </div>
        <button id="Ordenar" onclick="ordenar()"> Ordenar</button>
        </div>`
});
document.getElementById('menuPrincipal').style.display = "none";
document.getElementById('menuCategoria').style.display = "block";
}
function ordenar(cantidad) {
    
}

const cantProducto = (numero) => {
    var cantidad = (cantidad + numero) ;
    console.log(cantidad);   
};