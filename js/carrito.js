var carritoOculto = true;

/**Inicialmente se obtiene el carrito cargado en Storage **/

function obtenerCarritoStorage(){
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    return carritoStorage;
};

function obtenerCantidadStorage(){
    let cantidad = localStorage.getItem("cantidad");
    if(cantidad > 0 ){
        return parseInt(cantidad);
    }else{
        return 0;
    }
    
};


/** Inicio del proceso para agregar camisetas al carrito **/

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
    if(carritoDeCompras == null){
        carritoDeCompras = [];
        let compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta, cantidad:1};
        carritoDeCompras.push(compra); 
    }else{
        let existeCamiseta = carritoDeCompras.find((cam) => cam.camiseta == nombreCamiseta);
        if(existeCamiseta == undefined){
            let compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta, cantidad:1};
            carritoDeCompras.push(compra);
            if(!carritoOculto){
                $('#elementos-carrito').append(agregarHTMLcarrito(compra));
            } 
        }else{
            existeCamiseta.cantidad+=1;
            if(!carritoOculto){
                document.getElementById(`cantidad${nombreCamiseta}`).value = existeCamiseta.cantidad;
            }
        }
    } 
    cantidadCarrito += 1;  
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);
      
}


function verCarrito(){
    let elementosCarrito = document.getElementById("elementos-carrito");
    let carritoHTML = "";
    if(carritoOculto){
        for (const camisetaCarrito of carritoDeCompras) {
            carritoHTML += agregarHTMLcarrito(camisetaCarrito);                    
        }
        elementosCarrito.innerHTML += carritoHTML;
        let vaciarCarritoBoton = document.querySelector('#vaciarCarrito');
        vaciarCarritoBoton.onclick = vaciarCarrito;
        carritoOculto = false;
        botonBorrarItem();
    }else{
        elementosCarrito.innerHTML = "";
        carritoOculto = true;
    }
}
        
function agregarHTMLcarrito(camiseta){
        let html =        `<div id="carrito${camiseta.camiseta}" class="row d-flex align-items-center my-4 pb-5 px-4 item">
                            <div class="col-4">
                                <div class="carrito-item">
                                    <img class="carrito-img" src="${imagenes[(camiseta.camiseta).replace(" ","")]}" alt=""></img>
                                </div>
                            </div>
                            <div class="col-3">
                                <p>${camiseta.precioCamiseta}</p>
                            </div>
                            <div class="col-2">
                                <div class="d-flex justify-content-between"> 
                                    <input id="cantidad${camiseta.camiseta}" value="${camiseta.cantidad}" class="w-25 h-25">
                                </div>
                            </div>
                            <div class="col-1">
                                    <button id="eliminar${camiseta.camiseta}" class="btn btn-danger botonEliminar">X</button>
                                </div>
                            </div>
                        </div>`
                botonBorrarItem();
        return html;
}        


function botonBorrarItem(){
    let botonDelete = document.querySelectorAll('.botonEliminar');
    botonDelete.forEach(boton => boton.addEventListener("click",eliminarItemCarrito))
}


function eliminarItemCarrito(event){
    const botonClickeado = event.target;
    let camiseta = (event.target.id).substr(8);
    let posicionCamisetaEnCarrito = carritoDeCompras.findIndex(camisetaCarrito => camisetaCarrito.camiseta == camiseta);
    let cantidadActualEnCarrito = carritoDeCompras[posicionCamisetaEnCarrito].cantidad;
    if(cantidadActualEnCarrito > 1){
        carritoDeCompras[posicionCamisetaEnCarrito].cantidad -= 1;
        cantidadActualEnCarrito -= 1;
        if(cantidadActualEnCarrito == 0){
            carritoDeCompras.splice(posicionCamisetaEnCarrito,1);
            botonClickeado.closest('.item').remove();
        }else{
            if(!carritoOculto){
                document.getElementById(`cantidad${camiseta}`).value = cantidadActualEnCarrito;
            }
        }
    }else{
        carritoDeCompras.splice(posicionCamisetaEnCarrito,1);
        botonClickeado.closest('.item').remove();
    }
    if(cantidadCarrito > 0){
        cantidadCarrito -= 1;
    };
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);  
}



function vaciarCarrito() {
    carritoDeCompras = [];
    cantidadCarrito = 0;
    let camisetasCarrito = document.querySelector('#elementos-carrito');
    camisetasCarrito.innerHTML = "";

    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);  
}