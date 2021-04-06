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
                e.target.classList.remove('btn-dark');
                e.target.classList.add('btn-secondary');
                const talle = e.target.id;
                const card = e.target.closest('.card');
                const habilitarCompra = card.querySelector('.buy');
                habilitarCompra.removeAttribute('disabled');
                habilitarCompra.setAttribute("id",talle);
                });
                
            botonTalle.addEventListener('focusout', function(e){
                e.target.classList.add('btn-dark'); 
            })     
    });
    comprar();  

}


function comprar(){
    const botonComprar = document.querySelectorAll('.buy');
        botonComprar.forEach( boton =>{
                boton.addEventListener("click",capturarDatosCamiseta);
        }
    )
    
}

function capturarDatosCamiseta(event){
    const boton = event.target;
    let talleCamiseta= event.target.id;
    talleCamiseta = talleCamiseta.split(" ")[0];
    const datosCamiseta = boton.closest('.card');
    const nombreCamiseta = datosCamiseta.querySelector('.camiseta').textContent;
    const precioCamiseta = parseInt(datosCamiseta.querySelector('.precio').textContent);
    agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta,talleCamiseta);
    boton.setAttribute('disabled',"");
    
}



function agregarCamisetasAlCarrito(nombreCamiseta,precioCamiseta,talleCamiseta){
    if(carritoDeCompras == null){
        carritoDeCompras = [];
        let compra = {camiseta:nombreCamiseta, precioCamiseta: precioCamiseta, talleCamiseta, cantidad:1};
        carritoDeCompras.push(compra);
    }else{
        let existeCamiseta = carritoDeCompras.find((cam) => (cam.camiseta == nombreCamiseta && cam.talleCamiseta == talleCamiseta));
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
                document.getElementById(`cantidad${nombreCamiseta+ " " + talleCamiseta}`).innerHTML = existeCamiseta.cantidad;
            }
        }
    }
    cantidadCarrito += 1;  
    importeTotal += precioCamiseta;
    $('#h4-importe').html(` ${importeTotal} ARS`);
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);
    localStorage.setItem("importe",importeTotal);
    if(cantidadCarrito>0){
        $('#confirmar-carrito').prop('disabled', false);
    }
    alert("¡Producto agregado al carrito con éxito!");
    
}


function verCarrito(){
    let elementosCarrito = document.getElementById("elementos-carrito");
    let carritoHTML = "";
    if(carritoOculto){
        for (const camisetaCarrito of carritoDeCompras) {
            carritoHTML += agregarHTMLcarrito(camisetaCarrito);                    
        }                 
        $('#h4-importe').html(` ${importeTotal} ARS`);
        elementosCarrito.innerHTML += carritoHTML;
        let vaciarCarritoBoton = document.querySelector('#vaciarCarrito');
        vaciarCarritoBoton.onclick = vaciarCarrito;
        carritoOculto = false;
        botonBorrarItem();
    }

    if(cantidadCarrito>0){
        $('#confirmar-carrito').prop('disabled', false);
    }

}
        
function agregarHTMLcarrito(camiseta){
        let talle = camiseta.talleCamiseta.split(" ")[0];
        let html =        `<div id="carrito${camiseta.camiseta}" class="row  d-flex align-items-center justify-content-between text-center my-4 pb-5 item text-center">
                                <div class="col-3">
                                    <div class="carrito-item">
                                        <img class="carrito-img" src="${imagenes[(camiseta.camiseta).replace(" ","")]}" alt=""></img>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="talle-item">
                                        <p>${talle}</p>
                                    </div>
                                </div>
                                <div class="col-1 precio">
                                    <p>${camiseta.precioCamiseta}</p>
                                </div>
                                <div class="col-1">
                                    <p id="cantidad${camiseta.camiseta+ " " + talle}" class="w-25 h-25 mr-auto ml-auto">${camiseta.cantidad}</p>
                                </div>
                                <div class="col-1 ml-2">
                                        <button id="eliminar${camiseta.camiseta+ " " + talle}" class="btn btn-sm btn-danger mt-n3 botonEliminar">X</button>
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
    let id = (event.target.id).substr(8);
    let arrayID = id.split(" ");
    let tamaño = arrayID.length
    let talle = arrayID[tamaño - 1 ];
    arrayID.pop();
    let camiseta = arrayID.join(" ");
    let posicionCamisetaEnCarrito = carritoDeCompras.findIndex(camisetaCarrito => (camisetaCarrito.camiseta == camiseta && camisetaCarrito.talleCamiseta == talle));
    let cantidadActualEnCarrito = carritoDeCompras[posicionCamisetaEnCarrito].cantidad;
    if(cantidadActualEnCarrito > 1){
        carritoDeCompras[posicionCamisetaEnCarrito].cantidad -= 1;
        cantidadActualEnCarrito -= 1;
        console.log(cantidadActualEnCarrito);
        if(cantidadActualEnCarrito == 0){
            carritoDeCompras.splice(posicionCamisetaEnCarrito,1);
            botonClickeado.closest('.item').remove();
        }else{
            if(!carritoOculto){
                document.getElementById(`cantidad${camiseta+ " " + talle}`).innerHTML = cantidadActualEnCarrito;
            }
        }
    }else{
        carritoDeCompras.splice(posicionCamisetaEnCarrito,1);
        botonClickeado.closest('.item').remove();
    }
    importeTotal -= botonClickeado.closest('.item').querySelector('.precio').textContent;
    $('#h4-importe').html(` ${importeTotal} ARS`);
     
    if(cantidadCarrito > 0){
        cantidadCarrito -= 1;
    };
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);
    localStorage.setItem("importe",importeTotal);
    if(cantidadCarrito==0){
        $('#confirmar-carrito').prop('disabled', true);
    }  
}



function vaciarCarrito() {
    carritoDeCompras = [];
    cantidadCarrito = 0;
    importeTotal = 0;
    let camisetasCarrito = document.querySelector('#elementos-carrito');
    camisetasCarrito.innerHTML = "";
    $('#h4-importe').html(` ${importeTotal} ARS`);
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
    localStorage.setItem("cantidad",cantidadCarrito);  
    localStorage.setItem("importe",importeTotal);
}