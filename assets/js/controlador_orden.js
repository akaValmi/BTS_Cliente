let ordenS = localStorage.getItem("orden");
let orden = JSON.parse(ordenS);
let clienteS = localStorage.getItem("usuario");
let cliente = JSON.parse(clienteS);
var subTotal; 
var comisiones;
var isv;
var montoPagar;
let product = [];
let idOrden;
function renderizarProductos() {
    console.log(orden);
    document.getElementById('productos').innerHTML = '';
        var c = 0;
    orden.forEach(producto => {
        document.getElementById('productos').innerHTML += 
        ` <div class="contProducto">
        <div>
            <div class="precio">
                <i id="Cancelar" class="fa-solid fa-rectangle-xmark" onclick="eliminar(${c})"></i>
                <img class="imgOrden" src="/assets/img/productos/${producto.producto.imgProducto}" alt="">
                <p class="tituloProduc">${producto.producto.nombreProducto}</p>
                <div class="cantidad"> 
                <i class="fa-solid fa-circle-plus" onclick="agregar(${c})"></i>
                <p class="texto" id ="valor${c}"> ${producto.valor} </p>
                <i class="fa-solid fa-circle-minus" onclick="disminuir(${c})"></i>
                </div>
            </div>
        </div>
    </div>`
        ;c++
    });
    calcularTotal();
    document.getElementById('estadoOrden').style.display = "none";
    document.getElementById('enviarOrden').style.display = "none";
    document.getElementById('comprar').style.display = "block";
}

//agrega  1 a la cantidad del producto que se desea incrementar 
function agregar(c) {
    var valor = document.getElementById(`valor${c}`); 
    valor.innerHTML = parseInt(valor.innerHTML) + 1;
    orden[c].valor = parseInt(valor.innerHTML);
    let newOrden = JSON.stringify(orden);
    localStorage.setItem("orden", newOrden);
    calcularTotal()
}
//disminue  1 a la cantidad del producto que se desea decrementar
function disminuir(c) {
    var valor = document.getElementById(`valor${c}`);
    if(parseInt(valor.innerHTML) > 0){
        valor.innerHTML = parseInt(valor.innerHTML) - 1;
        orden[c].valor = parseInt(valor.innerHTML);
        let newOrden = JSON.stringify(orden);
        localStorage.setItem("orden", newOrden);
        calcularTotal()
    }
}

renderizarProductos();
function eliminar(c) {
    orden.splice(c, 1);
    let newOrden = JSON.stringify(orden);
    localStorage.setItem("orden", newOrden);
    if (orden==0) {
        location.href='menuPrincipal.html'
        console.log('me voy');
    }
    renderizarProductos();
}

function calcularTotal() {
    console.log(orden);
    document.getElementById('contTotal').innerHTML = '';
    subTotal = orden.reduce(function(acumulador, producto) {
        return acumulador + (producto.valor*producto.producto.precio);
      }, 0);
    comisiones=(subTotal*0.10);
    isv= (subTotal*0.15);
    montoPagar = subTotal+isv+comisiones;
        console.log(subTotal); 
    document.getElementById('contTotal').innerHTML = 
       `<p id="total"> SUBTOTAL: LPS.${subTotal}</p>
        <p id="total"> ISV: LPS.${isv}</p>
        <p id="total"> COMISIONES: LPS.${comisiones}</p>
        <p id="total"> TOTAL: LPS.${montoPagar}</p>
        <button id="btnCompra" onclick="enviarOrden()" >COMPRAR</button> `;
}

function enviarOrden() {
    agregarCantidadP();
    document.getElementById('estadoOrden').style.display = "none";
    document.getElementById('enviarOrden').style.display = "block";
    document.getElementById('comprar').style.display = "none";
}

async function estadoOrden() {
    let direccion = document.getElementById("direccion").value;
    let tarjeta = document.getElementById("tarjeta").value;
    let nombreCliente =cliente.nombreCliente;
    let estadoOrden = "PENDIENTE";
    let productos = product;

    if (direccion.length > 0 && tarjeta.length > 0) {
        const data = {
            nombreCliente,
            direccion,
            montoPagar,
            estadoOrden,
            productos,
          };
          console.log(data);
        document.getElementById('estadoOrden').style.display = "block";
        document.getElementById('enviarOrden').style.display = "none";
        document.getElementById('comprar').style.display = "none";

    
                const respuesta = await fetch(
                    `http://127.0.0.1:3002/ordenes/add`,
                    {
                        method: "post",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    }
                ); 
                const resJSON = await respuesta.json();
                console.log(resJSON);
                
                let id = resJSON.updateResponse._id;


    
                const respuestaa = await fetch(
                    `http://127.0.0.1:3002/clientes/${cliente._id}/productos`,
                    {
                        method: "put",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        }),
                    }
                );
            
                const ressJSON = await respuestaa.json();
            
                console.log('Respuesta de agregar orden a cliente',ressJSON);
                idOrden= id;
            verificarEstado()
    }
}
async function verificarEstado() {
    const respuesta = await fetch(`http://127.0.0.1:3002/ordenes/${idOrden} `, {
		method: "get",
	});
	estado  = await respuesta.json();
    console.log(estado);
    document.getElementById('estadoO').innerHTML='';
    document.getElementById('estadoO').innerHTML=estado.estadoOrden;
   
}
function agregarCantidadP() {
    orden.forEach(async producto => {
        let actual = producto.producto;
        let cantidad = producto.valor;
        const response  = await fetch(`http://localhost:3002/productos/${actual._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      cantidad: cantidad,
                    }),
                  });
                  const ressJSON = await response.json();
                  console.log(`se agrego cantidad`, ressJSON);
        const respuesta = await fetch(`http://localhost:3002/productos/${actual._id}`, {
        method: "get",
    });
    let actualizado = await respuesta.json();
    product.push(actualizado[0]);
    });
}