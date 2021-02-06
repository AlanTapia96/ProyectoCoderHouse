const iva = 0.21;
const costoEnvio = 0.15; //15% del valor da la camiseta. Ver si se puede utilizar API u otra cosa para calcular costo en base a distancias

const camisetasArgentina = ["Boca Juniors","River Plate","Independiente","Racing","San Lorenzo","Vélez Sarsfield"];
const camisetasBrasil = ["Santos","Palmeiras","Flamengo","Fluminense","Gremio","Corinthians"];
const camisetasEspaña = ["Barcelona","Real Madrid","Atlético de Madrid","Sevilla","Valencia","Villareal"];
const camisetasItalia = ["Juventus","Milan","Inter","Nápoli","Roma","Atlanta"];



class Camiseta{

    inicializar(club,pais,talle,precio){
        this.club = club;
        this.pais = pais;
        this.talle = talle;
        this.precio = parseFloat(precio);
        this.vendido = false;
    }

    vender(){
        this.vendido = true;
    }
}

const 



function eleccionInicial() {
    let opcionInicial = prompt("Por favor, indique el país al cual pertenece el equipo que desea la camiseta de fútbol:\n1. Argentina \n2. Brasil\n3. España\n4. Italia");
    while (opcionInicial < 1 || opcionInicial > 4 || opcionInicial == ""){
        alert("Opción inválida.")
        opcionInicial = prompt("Por favor, indique el país de su equipo de fútbol:\n1. Argentina \n2. Brasil\n3. España\n4. Italia");
    }
    if(opcionInicial == 1){
        let opcionCamiseta = prompt(mostrarCamisetas(camisetasArgentina));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasArgentina.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasArgentina));
        }
        alert("Usted eligió la camiseta de " + camisetasArgentina[opcionCamiseta - 1]);
        opcionInicial = "Argentina";
    }else if(opcionInicial == 2){
        let opcionCamiseta = prompt(mostrarCamisetas(camisetasBrasil));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasBrasil.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasBrasil));
        }
        alert("Usted eligió la camiseta de " + camisetasBrasil[opcionCamiseta - 1]);
        opcionInicial = "Brasil";
    }else if(opcionInicial == 3){
        let opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasEspaña.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasEspaña));
        }
        alert("Usted eligió la camiseta de " + camisetasEspaña[opcionCamiseta - 1]);
        opcionInicial = "España";
    }else{
        let opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        while (opcionCamiseta < 1 || opcionCamiseta > camisetasItalia.length){
            alert("Opción inválida.");
            opcionCamiseta = prompt(mostrarCamisetas(camisetasItalia));
        }
        alert("Usted eligió la camiseta de " + camisetasItalia[opcionCamiseta - 1]);
        opcionInicial = "Italia";
    };
    
    let costo = costoCamiseta(opcionInicial);
    alert("El costo es de la camiseta es $" + costo);
    let continuar = prompt("¿Desea ver el precio de otra camiseta? (S/N)")
    if(continuar == "S" || continuar == "s"){
        eleccionInicial();
    }else{
        alert("Muchas gracias por su visita!");
    }

}


function mostrarCamisetas(lista){
    let salida = "Camisetas:\n";
    for (let i = 0; i < lista.length; i++) {
        salida += (i + 1) + ". " + lista[i] + "\n";
    }
    return salida;
}

function costoCamiseta(eleccion){
    let camiseta = "" + eleccion;
    let costo = costoCamisetas[camiseta];
    let costoTotal = costo + (costo*iva);
    return costoTotal;
}


/*********************************** MAIN ***********************************/
alert("¡ Bienvenido a la tienda de camisetas de fútbol !");
eleccionInicial();



