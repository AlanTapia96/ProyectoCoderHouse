$(document).ready(function(){

/************************************** FUNCIONES **********************************/

/* Función creada para instanciar en un array todos los diferentes TIPOS DE CAMISETAS de cada país*/
function crearCamisetas(listaCamisetas,stock,cantidad,talle){
    for (const pais in listaCamisetas) {
         let listaPais = listaCamisetas[pais];
        for (let i=0; i<listaPais.length;i++){
            let camiseta = listaPais[i];
            let nuevaCamiseta = new Camiseta(camiseta,pais,cantidad,talle);
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



/*********************************EVENTOS******************************************/


function formulario(e){
    let datos = [];
    $('#contacto').submit(function (e) { 
        e.preventDefault();
        let nombre = $('#nombre').val();
        let mail = $('#email').val();
        let text = $('#text').val();
        datos.push(nombre,mail,text);
        nombre = document.getElementById("nombre");
        mail = document.getElementById("email");
        text = document.getElementById("text");
        nombre.value = mail.value = text.value = "";
    
    });
}



function generarCamisetasEvento(id,variedadCamisetas){ 
    let padre = document.getElementById("camisetas");
    let html = '';
    for (const camisetaPais in variedadCamisetas) {
        if (camisetaPais == id){
            let listaPais = variedadCamisetas[camisetaPais];
            for(let i=0; i<listaPais.length;i++){
                html += `  
                        <div class="card mb-2" style="width: 18rem;">
                            <div class="card-body d-flex align-items-center flex-column">
                                <h4 class="card-text camiseta text-center">${listaPais[i]}</h4>
                                <img class="img-fluid img" src="${imagenes[listaPais[i].replace(" ","")]}">
                                <h4 class="precio">${stockCamisetas.find(camiseta => camiseta.devolverClub() == listaPais[i]).devolverPrecio()}</h4>
                                <button id="${listaPais[i]}" class="btn btn-secondary buy">Comprar</button> 
                            </div>
                        
                        </div>
                        </div>`;
                }
            }
        }
       padre.innerHTML = html;
       comprar();
    }


function welcome() {
    if(localStorage.getItem("nombre") == null){
        localStorage.setItem("nombre",prompt("Por favor, ingrese su nombre"));
    }
    
    let welcome = document.getElementById("welcome");
    let names = localStorage.getItem("nombre");
    welcome.innerHTML = `Bienvenido ${names}`;
}

/******************************** API Provincias/Municipios *************************************** */

const url_provincias = "https://apis.datos.gob.ar/georef/api/provincias";

$.get(url_provincias, function(respuesta,estado) {
        if(estado === "success"){
            let provinciasApi = respuesta.provincias;
            let provincias = document.getElementById("provincias");
            let provinciasHTML = "<option disabled selected>Selecciona una opción</option>";
            for (const provincia of provinciasApi) {
                provinciasHTML += `<option id="${provincia.id}" class="provincia">${provincia.nombre}</option>`;
            }
            provincias.innerHTML = provinciasHTML;
            let seleccion = document.getElementById("provincias");
            seleccion.onchange = function(){
                let provinciaElegida = seleccion.value;
                $.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provinciaElegida}&campos=id,nombre&max=4000`,function(respuesta2,estado2){
                    if(estado2 === "success"){
                        let municipiosApi = respuesta2.departamentos;
                        let municipios    = document.getElementById("municipios");
                        let municipiosHTML =  "<option disabled selected>Selecciona una opción</option>";
                        for (const municipio of municipiosApi){
                            municipiosHTML += `<option id="${municipio.id}" class="provincia">${municipio.nombre}</option>`
                        }
                        municipios.innerHTML = municipiosHTML;
                    }
                }
                )
            }
        }else{
            console.log("No se pudo procesar");
        }
    });





/*********************************** MAIN ***********************************/

crearCamisetas(variedadCamisetas,stockCamisetas,20,"s");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"m");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"l");
crearCamisetas(variedadCamisetas,stockCamisetas,0,"xl");

welcome();

carritoDeCompras = obtenerCarritoStorage();
console.log(carritoDeCompras);
cantidadCarrito = obtenerCantidadStorage();

for (const idPais in variedadCamisetas) {
    let clickPais = document.getElementById(idPais);
    clickPais.onclick = () => generarCamisetasEvento(idPais,variedadCamisetas,stockCamisetas);
}



$('#btnCarrito').click(function(){
    $('#carrito').toggle("slow",verCarrito);
}
 );



formulario();

})


//Los datos del formulario guardarlos en algún lugar (array / objeto)

//Arreglar el recorrido de las camisetas en el boton comprar. Recorre TODAS las camisetas. No es eficiente
/*
Agregar algún filtro para buscar
*/
