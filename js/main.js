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

/********************************** DECLARACIÓN DE VARIABLES ***********************************/

const iva = 0.21;

const camisetasArgentina = ["Boca Juniors","River Plate","Independiente","Racing","San Lorenzo","Vélez Sarsfield"];
const camisetasBrasil = ["Santos","Palmeiras","Flamengo","Fluminense","Gremio","Corinthians"];
const camisetasEspaña = ["Barcelona","Real Madrid","Atlético de Madrid"];
const camisetasItalia = ["Juventus","Milan","Inter","Nápoli"];

const stockArgentina = [];
const stockBrasil = [];
const stockItalia = [];
const stockEspaña = [];

crearCamisetas(camisetasArgentina,stockArgentina,"Argentina",30,"m");
crearCamisetas(camisetasBrasil,stockBrasil,"Brasil",30,"m");
crearCamisetas(camisetasEspaña,stockEspaña,"España",30,"m");
crearCamisetas(camisetasItalia,stockItalia,"Italia",30,"m");

let carritoDeCompras = [];
let importe = [];

/*****************************************************************************************************************/





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
function crearCamisetas(listaCamisetas,listaNueva,pais,cantidad,talle){
    for (let i = 0; i < listaCamisetas.length; i++) {
        let camiseta = listaCamisetas[i];
        if(!(listaNueva.find(x=>x.devolverClub() == camiseta))){ //Si no está creada, la crea.
            let nueva = new Camiseta(camiseta,pais,cantidad,talle);
            listaNueva.push(nueva);
        };
    }
}

function aumento(lista,aumento) {
    lista.map(camiseta => camiseta.modificarPrecio(camiseta.devolverPrecio()*aumento));    
}


function eleccion(etapa) {
    
    let opcionInicial = prompt("Por favor, indique el país al cual pertenece el equipo que desea la camiseta de fútbol:\n1. Argentina \n2. Brasil\n3. España\n4. Italia\n");
    while (opcionInicial < 1 || opcionInicial > 4 || opcionInicial == ""){
        alert("Opción inválida.")
        opcionInicial = prompt("Por favor, indique el país de su equipo de fútbol:\n1. Argentina \n2. Brasil\n3. España\n4. Italia");
    }

    if(opcionInicial == 1){
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasArgentina));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasArgentina.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasArgentina));
        }
        opcionInicial = "Argentina";
        stockArgentina[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockArgentina[parseInt(opcionCamiseta) - 1].devolverClub();
        precio = costoCamiseta(stockArgentina.find(camiseta => camiseta.devolverClub()).devolverPrecio());
    }
    else if(opcionInicial == 2){
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasBrasil));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasBrasil.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasBrasil));
        }
        opcionInicial = "Brasil";
        stockBrasil[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockBrasil[parseInt(opcionCamiseta) - 1].devolverClub();
        precio = costoCamiseta(stockArgentina.find(camiseta => camiseta.devolverClub()).devolverPrecio());

    }else if(opcionInicial == 3){
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasEspaña.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        }
        opcionInicial = "España";
        stockEspaña[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockEspaña[parseInt(opcionCamiseta) - 1].devolverClub();
        precio = costoCamiseta(stockArgentina.find(camiseta => camiseta.devolverClub()).devolverPrecio());
    }else{
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasItalia.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        }
        opcionInicial = "Italia";
        stockItalia[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockEspaña[parseInt(opcionCamiseta) - 1].devolverClub();
        precio = costoCamiseta(stockArgentina.find(camiseta => camiseta.devolverClub()).devolverPrecio());
    }
    carritoDeCompras.push(opcionCamiseta);
    importe.push(precio);
    
    alert("Usted eligió la camiseta de " + opcionCamiseta + " por un precio total de " + precio);

    continuar = prompt("Desea comprar otra camiseta? (S/N)")
    if(continuar == "S" || continuar == "s"){
        eleccion(etapa+1);
    }
    if(etapa===0){
        continuar = prompt("Desea ver su carrito de compras? (S/N)")
        if(continuar == "S" || continuar == "s"){
            mostrarCarrito(carritoDeCompras,importe);
        }else{
            alert("Muchas gracias por su visita!");
        }
    }

}

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
        p.innerHTML = `Camiseta: ${listaCompras[i]} - Precio: ${listaImporte[i]}`
        contenedor.appendChild(p);
        carrito.appendChild(contenedor);
    }
        
}


/*********************************** MAIN ***********************************/
alert("¡ Bienvenido a la tienda de camisetas de fútbol !");
aumento(stockArgentina,1.20);
aumento(stockBrasil,1.20);
aumento(stockEspaña,1.20);
aumento(stockItalia,1.20);
eleccion(0);




/*
generarCamisetasEnHTML(stockArgentina);
generarCamisetasEnHTML(stockBrasil);
generarCamisetasEnHTML(stockEspaña);
generarCamisetasEnHTML(stockItalia);
*/