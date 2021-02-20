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

    descontarCantidad(){
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
}


/************************************** FUNCIONES **********************************/


function mostrarCamisetas(lista){
    let salida = "Camisetas:\n";
    for (let i = 0; i < lista.length; i++) {
        salida += (i + 1) + ". " + lista[i] + "\n";
    }
    return salida;
}

function costoCamiseta(costo){
    let costoTotal = costo + (costo*iva);
    return costoTotal;
}


/* Función creada para instanciar en un array todos los diferentes TIPOS DE CAMISETAS de cada país*/
function crearCamisetas(listaCamisetas,stock,cantidad,talle){
    for (const camisetaPais in listaCamisetas) {
         let listaPais = listaCamisetas[camisetaPais];
         let listaAux = [];
        for (let i=0; i<listaPais.length;i++){
            let camiseta = listaPais[i];
            let nuevaCamiseta = new Camiseta(camiseta,listaPais,cantidad,talle);
            stock.push(nuevaCamiseta);
        }
        //stock.push(listaAux);
    }
}

/*function aumento(lista,aumento) {
    lista.map(camiseta => camiseta.modificarPrecio(camiseta.devolverPrecio()*aumento));    
}*/




function generarCamisetasEnHTML(listaCamisetas){
    let camisetas = document.getElementById("camisetas");
    let contenedor = document.createElement("div");
    for (const camiseta of listaCamisetas) {
        let li = document.createElement("li");
        li.innerHTML = `La camiseta de ${camiseta.club} cuesta ${camiseta.devolverPrecio()*(iva+1)}`;
        camisetas.appendChild(li);
    }
}


function mostrarCarrito(listaCompras,listaImporte){
    let carrito = document.getElementById("carrito");
    for (let i = 0; i < listaCompras.length; i++) {
        let contenedor = document.createElement("div");
        let p = document.createElement("p");
        p.innerHTML = `<h2>Carrito de Compras:</h2>
        Camiseta: ${listaCompras[i]} - Precio: ${listaImporte[i]}`
        contenedor.appendChild(p);
        carrito.appendChild(contenedor);
    }
        
}


/*********************************EVENTOS******************************************/

let formulario = document.getElementById("form");
formulario.onsubmit = function(evento) {
    evento.preventDefault();
}


function generarCamisetasEvento(id,variedadCamisetas,stockCamisetas){ //Luego reemplazar por una función que muestre solo para los que haya stock
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
                                <button id="listaPais[i]" class="btn btn-secondary">Comprar</button> 
                            </div>
                        
                        </div>
                        </div>`;
                }
            }
        }
        padre.innerHTML = html; 
}



/*<h3 class="text-center text-primary">
                            ${listaPais[i]} 
                            -> Precio: ${stockCamisetas.find(camiseta => camiseta.devolverClub()==listaPais[i]).devolverPrecio()}
                            -> <img  src="${imagenes[listaPais[i].replace(" ","")]}">
                            -> <button id="listaPais[i]" class="btn btn-secondary">Comprar</button>    
                        </h3>

*/

/*********************************** MAIN ***********************************/

crearCamisetas(variedadCamisetas,stockCamisetas,20,"s");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"m");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"l");
crearCamisetas(variedadCamisetas,stockCamisetas,0,"xl");

console.log(stockCamisetas);

let clickPais = document.getElementById("argentina");
clickPais.onclick = () => generarCamisetasEvento("argentina",variedadCamisetas,stockCamisetas);

clickPais = document.getElementById("brasil");
clickPais.onclick = () => generarCamisetasEvento("brasil",variedadCamisetas,stockCamisetas);

clickPais = document.getElementById("italia");
clickPais.onclick = () => generarCamisetasEvento("italia",variedadCamisetas,stockCamisetas);

clickPais = document.getElementById("españa");
clickPais.onclick = () => generarCamisetasEvento("españa",variedadCamisetas,stockCamisetas);






