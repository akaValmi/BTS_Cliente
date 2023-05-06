var Categorias;
var orden = [];
function menuPrin() {
    document.getElementById('menuPrincipal').style.display = "block";
    document.getElementById('menuCategoria').style.display = "none";
    renderizarCategorias();
 }
 menuPrin()
//renderiza cada categoria 
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
// muestra cada producto de la categoria seleccionada 
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

//agrega  1 a la cantidad del producto que se desea incrementar 
function agregar(c) {
    var valor = document.getElementById(`valor${c}`);
    valor.innerHTML = parseInt(valor.innerHTML) + 1;
}
//disminue  1 a la cantidad del producto que se desea decrementar
function disminuir(c) {
    var valor = document.getElementById(`valor${c}`);
    if(parseInt(valor.innerHTML) > 0){
        valor.innerHTML = parseInt(valor.innerHTML) - 1;
    }
}
//agrega un producto al arreglo de los productos que se desea ordenar 
function ordenar(c, idCategoria) {
    //cantidad que se desea de un produto
    var valor = parseInt(document.getElementById(`valor${c}`).innerHTML);
    //el producto seleccionado 
    var producto =Categorias[idCategoria].productos[c];
    //XD para saber si el producto ua se encuentra en el arreglo  
    let estaba = false;

    for (let i = 0; i < orden.length; i++) {
        //id del producto en el arreglo de la orden 
        const id = orden[i].producto._id;
        //comparacion del id del producto ingresado con el que ya esta en el arreglo 
        if (producto._id == id) {
            if (valor == 0) {
                orden.splice(i, 1);
            } else {
                orden[i].valor = valor;
            }
            estaba = true;
            console.log('Entrooo');

            break;
        }
    }
    //En caso que no este en el arreglo se agrega al mismo 
    if (estaba == false) {
        var newOrden = {
            valor: valor,
            producto: producto
            };
            console.log(newOrden);
          // Agregar objeto orden al arreglo de orden
          orden.push(newOrden);
    }
    console.log(orden);
  }
  function renderizarOrden() {
    if (orden != 0) {
        let newOrden = JSON.stringify(orden);
        localStorage.setItem("orden", newOrden);
        console.log('Existo');
        location.href='orden.html';
    }
    console.log(' no Existo');    
 } 