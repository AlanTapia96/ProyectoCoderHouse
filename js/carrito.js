let carritoOculto = true;

function comprar(){
    let botonComprar = document.querySelectorAll('.buy');
        botonComprar.forEach( boton =>{
                boton.addEventListener("click",capturarDatosCamiseta)
        }
    )
}

function capturarDatosCamiseta(event){
    const boton = event.target;
    const datosCamiseta = boton.closest('.card');

    let nombreCamiseta = datosCamiseta.querySelector('.camiseta').textContent;
    let precioCamiseta = parseInt(datosCamiseta.querySelector('.precio').textContent);
    
    agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta);
}


function agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta){
    const compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta}
    if(localStorage.getItem("carrito") == null){
        localStorage.setItem("carrito",["carrito0"]);
        let elementoCarrito = JSON.stringify(compra);
        localStorage.setItem("carrito0",elementoCarrito);
        
    }else{
        let carrito = localStorage.getItem("carrito").split(",");
        let cantidad = carrito.length;
        carrito.push("carrito"+cantidad);
        localStorage.setItem("carrito",carrito);

        localStorage.setItem(`carrito${cantidad}`,JSON.stringify(compra));       
    }
    
}


function agregarCamisetasStorageAlaVistaCarrito(){

        let carritoStorage = localStorage.getItem("carrito").split(",");
        for (let i = 0; i < carritoStorage.length; i++) {
            let camisetaCaracter = carritoStorage[i];
            let camiseta = JSON.parse(localStorage.getItem(camisetaCaracter));
            let carrito = document.getElementById('elementos-carrito');
            let camisetaCarrito = ` <div class="row d-flex align-items-center my-4 pb-5 px-4 item">
                                <div class="col-5">
                                    <div class="carrito-item">
                                        <img class="carrito-img" src="${imagenes[(camiseta.camiseta).replace(" ","")]}" alt=""></img>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <p>${camiseta.precioCamiseta}</p>
                                </div>
                                <div class="col-4">
                                    <div class="d-flex justify-content-between"> 
                                        <input value="1" class="w-25 h-25">
                                    </div>
                                </div>
                                <div class="col-1">
                                        <button id="${carritoStorage[i]}" class="btn btn-danger botonEliminar">X</button>
                                    </div>
                                </div>
                            </div>`

                            carrito.innerHTML += camisetaCarrito;
        }
        let vaciarCarritoBoton = document.querySelector('#vaciarCarrito');
        vaciarCarritoBoton.onclick = vaciarCarrito;
    }

    

function botonBorrarItem(){
    let botonDelete = document.querySelectorAll('.botonEliminar');
    botonDelete.forEach(boton => boton.addEventListener("click",eliminarItemCarrito))
}

function eliminarItemCarrito(event){
    const botonClickeado = event.target;
    botonClickeado.closest('.item').remove();
    let item = event.target.id;
    console.log(item);
    let carritoStorage = localStorage.getItem("carrito").split(",");
    let indice = carritoStorage.indexOf(item);
    console.log(indice);
    
    if(indice != -1){
        localStorage.removeItem(item);
        carritoStorage.splice(indice,1);
        localStorage.setItem("carrito",carritoStorage);
    }
 
}



function vaciarCarrito() {
    let camisetasCarrito = localStorage.getItem("carrito").split(",");
    console.log(camisetasCarrito);
    for (let i = 0; i < camisetasCarrito.length; i++) {
        let filaCarrito = document.getElementById(camisetasCarrito[i]);
        filaCarrito.closest('.item').remove();    
        localStorage.removeItem(camisetasCarrito[i]);
            
    }
    localStorage.removeItem("carrito");
    let plantillaCarrito = document.querySelector('#plantilla-carrito');
    console.log(plantillaCarrito);
    plantillaCarrito.innerHTML = "";
}
