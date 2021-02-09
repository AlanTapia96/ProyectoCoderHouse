class Camiseta{
    constructor(club,pais,cantidad,talle){
        this.club = club;
        this.pais = pais;
        this.cantidad = cantidad;
        this.talle = talle;
        this.precio = 1500;

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


/* Función creada para instanciar los diferentes TIPOS DE CAMISETAS de cada país*/
function crearCamisetas(listaCamisetas,listaNueva,pais,cantidad,talle){
    for (let i = 0; i < listaCamisetas.length; i++) {
        let camiseta = listaCamisetas[i];
        if(!(listaNueva.find(x=>x.devolverClub() == camiseta))){ //Si no está creada, la crea.
            let nueva = new Camiseta(camiseta,pais,cantidad,talle);
            listaNueva.push(nueva);
        };
    }
}


function eleccionInicial() {
    let opcionInicial = prompt("Por favor, indique el país al cual pertenece el equipo que desea la camiseta de fútbol:\n1. Argentina \n2. Brasil\n3. España\n4. Italia\n(Solo hay stock camisetas Argentinas)");
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

    }else if(opcionInicial == 3){
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasEspaña.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        }
        opcionInicial = "España";
        stockEspaña[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockEspaña[parseInt(opcionCamiseta) - 1].devolverClub();
    }else{
        var opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasItalia.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        }
        opcionInicial = "Italia";
        stockItalia[parseInt(opcionCamiseta) - 1].descontarCantidad();
        opcionCamiseta = stockEspaña[parseInt(opcionCamiseta) - 1].devolverClub();
    }

    alert("Usted eligió la camiseta de " + opcionCamiseta);

    
    
    continuar = prompt("Desea comprar otra camiseta? (S/N)")
    if(continuar == "S" || continuar == "s"){
        eleccionInicial();
    }else{
        alert("Muchas gracias por su visita!");
    }
}



/********************************** DECLARACIÓN DE VARIABLES ***********************************/

const iva = 0.21;

const camisetasArgentina = ["Boca Juniors","River Plate","Independiente","Racing","San Lorenzo","Vélez Sarsfield"];
const camisetasBrasil = ["Santos","Palmeiras","Flamengo","Fluminense","Gremio","Corinthians"];
const camisetasEspaña = ["Barcelona","Real Madrid","Atlético de Madrid","Sevilla","Valencia","Villareal"];
const camisetasItalia = ["Juventus","Milan","Inter","Nápoli","Roma","Atlanta"];

const stockArgentina = [];
const stockBrasil = [];
const stockItalia = [];
const stockEspaña = [];

crearCamisetas(camisetasArgentina,stockArgentina,"Argentina",30,"m");
crearCamisetas(camisetasBrasil,stockBrasil,"Brasil",30,"m");
crearCamisetas(camisetasEspaña,stockEspaña,"España",30,"m");
crearCamisetas(camisetasItalia,stockItalia,"Italia",30,"m");


/*****************************************************************************************************************/





/*********************************** MAIN ***********************************/
alert("¡ Bienvenido a la tienda de camisetas de fútbol !");
eleccionInicial();


