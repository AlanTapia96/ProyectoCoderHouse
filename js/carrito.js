var carritoOculto = true;


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

function obtenerImporteStorage(){
    let importe = localStorage.getItem("importe");
    if(importe > 0 ){
        return parseFloat(importe);
    }else{
        return 0;
    }
}


function elegirTalle(){
    let botonesTalle = document.querySelectorAll('.talle');
    botonesTalle.forEach(botonTalle => {
            botonTalle.addEventListener("click", function(e){
                const talle = e.target.id;
                const card = e.target.closest('.card');
                const habilitarCompra = card.querySelector('.buy');
                habilitarCompra.removeAttribute('disabled');
                habilitarCompra.setAttribute("id",talle);
                });   
    });

    comprar();
}


function comprar(){
    const botonComprar = document.querySelectorAll('.buy');
        botonComprar.forEach( boton =>{
                boton.addEventListener("click",capturarDatosCamiseta)
        }
    )
}

function capturarDatosCamiseta(event){
    const boton = event.target;
    const talleCamiseta= event.target.id;
    const datosCamiseta = boton.closest('.card');
    const nombreCamiseta = datosCamiseta.querySelector('.camiseta').textContent;
    const precioCamiseta = parseInt(datosCamiseta.querySelector('.precio').textContent);
    
    agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta,talleCamiseta);
}



function agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta,talleCamiseta){
    if(carritoDeCompras == null){
        carritoDeCompras = [];
        let compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta, talleCamiseta, cantidad:1};
        carritoDeCompras.push(compra);
    }else{
        let existeCamiseta = carritoDeCompras.find((cam) => cam.talleCamiseta == talleCamiseta);
        if(existeCamiseta == undefined){
            let compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta, talleCamiseta: talleCamiseta, cantidad:1};
            carritoDeCompras.push(compra);
            if(!carritoOculto){
                $('#elementos-carrito').append(agregarHTMLcarrito(compra));
                botonBorrarItem();
            } 
        }else{
            existeCamiseta.cantidad+=1;
            if(!carritoOculto){
                document.getElementById(`cantidad${nombreCamiseta}`).innerHTML = existeCamiseta.cantidad;
            }
        }
    } 
    cantidadCarrito += 1;  
    importeTotal += precioCamiseta;
    $('#h4-importe').html(` ${importeTotal}`);
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);
    localStorage.setItem("importe",importeTotal);
      
}


function verCarrito(){
    let elementosCarrito = document.getElementById("elementos-carrito");
    let carritoHTML = "";
    if(carritoOculto){
        for (const camisetaCarrito of carritoDeCompras) {
            carritoHTML += agregarHTMLcarrito(camisetaCarrito);                    
        }                 
        $('#h4-importe').html(` ${importeTotal}`);
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
        let html =        `<div id="carrito${camiseta.camiseta}" class="row  d-flex align-items-center justify-content-around text-center my-4 pb-5 item text-center">
                                <div class="col-3">
                                    <div class="carrito-item">
                                        <img class="carrito-img" src="${imagenes[(camiseta.camiseta).replace(" ","")]}" alt=""></img>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="talle-item">
                                        <p>${camiseta.talleCamiseta.split(" ")[0]}</p>
                                    </div>
                                </div>
                                <div class="col-3 precio">
                                    <p>${camiseta.precioCamiseta}</p>
                                </div>
                                <div class="col-2">
                                    <p id="cantidad${camiseta.camiseta}" class="w-25 h-25 mr-auto ml-auto">${camiseta.cantidad}</p>
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
    importeTotal -= botonClickeado.closest('.item').querySelector('.precio').textContent;
    $('#h4-importe').html(` ${importeTotal}`);
     
    if(cantidadCarrito > 0){
        cantidadCarrito -= 1;
    };
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);  
}



function vaciarCarrito() {
    carritoDeCompras = [];
    cantidadCarrito = 0;
    importeTotal = 0;
    let camisetasCarrito = document.querySelector('#elementos-carrito');
    camisetasCarrito.innerHTML = "";
    $('#h4-importe').html(` ${importeTotal}`);
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);  
    localStorage.setItem("importe",importeTotal);
}