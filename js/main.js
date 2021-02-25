class Camiseta{
    constructor(club,pais,cantidad,talle){
        this.club = club;
        this.pais = pais;
        this.cantidad = cantidad;
        this.talle = talle;
        this.precio = 1500; //Precio estandar hasta el momento para todas las camisetas

    }

    modificarPrecio(precio){
        this.precio = parseFloat(precio);
    }

    agregarCantidad(cant){
        this.cantidad += cant;
    }   

    vender(){
        this.cantidad -= 1;
    }

    devolverClub(){
        return this.club;
    }

    devolverCantidad(){
        return this.cantidad;
    }

    devolverTalle(){
        return this.talle;
    }

    devolverPrecio(){
        return this.precio;
    }

    devolverPais(){
        return this.pais;
    }
}


/************************************** FUNCIONES **********************************/

/* Función creada para instanciar en un array todos los diferentes TIPOS DE CAMISETAS de cada país*/
function crearCamisetas(listaCamisetas,stock,cantidad,talle){
    for (const pais in listaCamisetas) {
         let listaPais = listaCamisetas[pais];
        for (let i=0; i<listaPais.length;i++){
            let camiseta = listaPais[i];
            let nuevaCamiseta = new Camiseta(camiseta,listaPais,cantidad,talle);
            stock.push(nuevaCamiseta);
        }
    }
}

function costoCamiseta(costo){
    let costoTotal = costo + (costo*iva);
    return costoTotal;
}


function aumento(lista,aumento) {
    lista.map(camiseta => camiseta.modificarPrecio(camiseta.devolverPrecio()*aumento));    
}



/*function mostrarCarrito(listaCompras,listaImporte){
    let carrito = document.getElementById("carrito");
    for (let i = 0; i < listaCompras.length; i++) {
        let contenedor = document.createElement("div");
        let p = document.createElement("p");
        p.innerHTML = `<h2>Carrito de Compras:</h2>
        Camiseta: ${listaCompras[i]} - Precio: ${listaImporte[i]}`
        contenedor.appendChild(p);
        carrito.appendChild(contenedor);
    }
        
}*/


/*********************************EVENTOS******************************************/
function formulario(id) {
    id.onsubmit = function(evento) {
            evento.preventDefault();
            let form = evento.target;
            console.dir(form);
            alert(form.children[0] .value);
            }   
}



function generarCamisetasEvento(id,variedadCamisetas){ //Luego reemplazar por una función que muestre solo para los que haya stock
    let padre = document.getElementById("camisetas");
    let html = '';
    for (const camisetaPais in variedadCamisetas) {
        if (camisetaPais == id){
            let listaPais = variedadCamisetas[camisetaPais];
            for(let i=0; i<listaPais.length;i++){
                html += `
                        
                        <div class="card mb-2" style="width: 18rem;">
                            <img src="${imagenes[listaPais[i].replace(" ","")]}">
                            <div class="card-body d-flex align-items-center flex-column">
                                <h4 class="card-text text-center ">${listaPais[i]}</h4>
                                <button id="${listaPais[i]}" class="btn btn-secondary">Comprar</button> 
                            </div>
                        
                        </div>
                        </div>`;
                }
            }
        }
       padre.innerHTML = html; 
        for (const camiseta of stockCamisetas){
                let botonComprar = document.getElementById(camiseta.devolverClub());
                botonComprar.onclick = () => {
                                    camiseta.vender();
                                    carritoDeCompras.push(camiseta.devolverClub()); //agrego al carrito
                                    importe.push(camiseta.devolverPrecio());
                                    alert(`Compraste la camiseta ${camiseta.devolverClub()}`)
                                    console.log(carritoDeCompras);
                                    }
        
    }

    /*
    for (const camiseta of stockCamisetas){
            if(camiseta.devolverPais() == id){
                let botonComprar = document.getElementById(camiseta.devolverClub());
                botonComprar.onclick = () => {
                    camiseta.vender();
                    carritoDeCompras.push(camiseta.devolverClub()); //agrego al carrito
                    importe.push(camiseta.devolverPrecio());
                    alert(`Compraste la camiseta ${camiseta.devolverClub()}`)
            }
        }
    }
    */
}



/*********************************** MAIN ***********************************/

crearCamisetas(variedadCamisetas,stockCamisetas,20,"s");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"m");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"l");
crearCamisetas(variedadCamisetas,stockCamisetas,0,"xl");

console.log(stockCamisetas);


for (const idPais in variedadCamisetas) {
    let clickPais = document.getElementById(idPais);
    clickPais.onclick = () => generarCamisetasEvento(idPais,variedadCamisetas,stockCamisetas);
}

console.log(carritoDeCompras);


carritoDeCompras = ["hola","chau"];
importe = ["1","2"];


let carrito = document.getElementById("carritoCompras");
carrito.onclick = function(carritoDeCompras,importe){
                        let padre = document.getElementById("carrito");
                        let p = "<h2>Carrito de Compras:</h2>";
                        for (let i = 0; i < carritoDeCompras.length; i++) {
                            p += `<div>Camiseta: ${carritoDeCompras[i]} - Precio: ${importe[i]}</div>`
                        }
   padre.innerHTML = p;
};

formulario(document.getElementById("form"));


//consultar formulario
//consultar error botones
//consultar carrito de compras

