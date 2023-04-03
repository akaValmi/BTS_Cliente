var Categorias = [
    {
        id: 0,
        Nombre:"Pizzas",
        Productos: [
            {
                idProducto:"0",
                Imagen:"/assets/img/productos/4estaciones.jpg",
                Nombre:"4 ESTACIONES",
                Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
                Precio:"299.00"
            },
            {
                idProducto:"",
                Imagen:"/assets/img/productos/SuperSuprema.jpg",
                Nombre:"SUPER SUPREMA",
                Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
                Precio:"354.00"
            }
        ]
    },
    {
        id: 1,
        Nombre:"Complemento",
        Productos: [
            {
                idProducto:"0",
                Imagen:"/assets/img/productos/ENCANELADOS.PNG",
                Nombre:"ENCANELADOS",
                Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
                Precio:"300.00"
            }
        ]
    },
    {
        id: 2,
        Nombre:"Promociones",
        Productos: [
            {
                idProducto:"0",
                Imagen:"/assets/img/productos/PROMO1.PNG",
                Nombre:"2 COMBOS PAN PIZZA PERSONAL",
                Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
                Precio:"300.00"
            }
        ]
    },
    {
        id: 3,
        Nombre:"Bebidas",
        Productos: [
            {
                idProducto:"0",
                Imagen:"/assets/img/productos/AGUAZUL.PNG",
                Nombre:"AGUAZUL",
                Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
                Precio:"22.00"
            }
        ]
    }
    ]

    var Orden = [
        {
            Imagen:"/assets/img/productos/ENCANELADOS.PNG",
            Nombre:"ENCANELADOS",
            Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
            Precio:"300.00"
        },
        {
            Imagen:"/assets/img/productos/PROMO1.PNG",
            Nombre:"2 COMBOS PAN PIZZA PERSONAL",
            Descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolores facere omnis. Optio, distinctio ipsa.",
            Precio:"300.00"
        }

    ]
     function menuPrin() {
        document.getElementById('menuPrincipal').style.display = "block";
        document.getElementById('menuCategoria').style.display = "none";
     }
     menuPrin()
 
 function menuCategoria(idCategoria) {
    let cantidad = 0;
    var productos = Categorias[idCategoria].Productos;
    document.getElementById('productos').innerHTML = '';
    productos.forEach(producto => {
        document.getElementById('productos').innerHTML += 
            `<div class="contProducto">
            <img class="imgProduc" src="${producto.Imagen}" alt="">
            <div>
                <div class="informacionProducto">
                    <h4 class="tituloProduc">${producto.Nombre}</h4>
                    <p class="texto">${producto.Descripcion}</p>
                </div>
                <div class="precio">
                    <p class="texto">LPS.${producto.Precio}</p>
                    <div class="cantidad"> 
                        <p class="texto">CANTIDAD: </p>
                        <i class="fa-solid fa-circle-plus"></i>
                        <p class="texto"> ${cantidad} </p>
                        <i class="fa-solid fa-circle-minus"></i>
                    </div>
                </div>
            </div>
            <button id="Ordenar"> Ordenar</button>
            </div>`
        ;
    });
    document.getElementById('menuPrincipal').style.display = "none";
    document.getElementById('menuCategoria').style.display = "block";
 }

 function renderizarOrden() {
    console.log('Existo')
    //document.getElementById('total').innerHTML='hoal';
    /*Orden.forEach(producto => {
        //document.getElementById('ordenCliente').innerHTML += 
            `<div class="contProducto">
            <img class="imgProduc" src="${producto.Imagen}" alt="">
            <div>
                <div class="precio">
                    <i class="fa-solid fa-rectangle-xmark"></i>
                    <img class="imgProduc" src="${producto.Imagen}" alt="">
                    <h4 class="tituloProduc">${producto.Nombre}</h4>
                    <div class="cantidad"> 
                        <i class="fa-solid fa-circle-plus"></i>
                        <p class="texto"> ${cantidad} </p>
                        <i class="fa-solid fa-circle-minus"></i>
                    </div>
                </div>
            </div>
            </div>`
        ;
    });*/
    location.href='orden.html'

    
 } 