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
function formulario(id) {
    let datos = []
    id.onsubmit = (evento) => {
            evento.preventDefault();
            let nombre = document.getElementById("nombre");
            let mail = document.getElementById("email");
            let text = document.getElementById("text"); 
            datos.push(nombre.value,mail.value,text.value); 
            nombre.value = mail.value = text.value = "";
            console.log(datos);
            }  
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

/************************************************************************** */






/*********************************** MAIN ***********************************/

crearCamisetas(variedadCamisetas,stockCamisetas,20,"s");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"m");
crearCamisetas(variedadCamisetas,stockCamisetas,20,"l");
crearCamisetas(variedadCamisetas,stockCamisetas,0,"xl");

welcome();


for (const idPais in variedadCamisetas) {
    let clickPais = document.getElementById(idPais);
    clickPais.onclick = () => generarCamisetasEvento(idPais,variedadCamisetas,stockCamisetas);
}



var carritoDesplegado = false;
const carrito = document.getElementById("botonCarrito");
carrito.addEventListener("click",(e) => {
    if(localStorage.getItem("carrito") == null){
        alert("El carrito se encuentra vacío")
    }else{
        const plantillaCarrito = document.querySelector('#plantilla-carrito');
        const carritoCompras = document.querySelector('#elementos-carrito');
        if(carritoDesplegado == false){
            let templateCarrito = document.createElement("div");
            let agregar = `<div class="row d-flex align-items-center px-5 py-4">
                                <div class="col-5 border-bottom">
                                    <h4>Camiseta</h4>
                                </div>
                                <div class="col-2 border-bottom">
                                    <h4>Precio</h4>
                                </div>
                                <div class="col-4 border-bottom">
                                    <h4>Cantidad</h4>
                                </div>
                                <div class="col-1">
                                    <button id="vaciarCarrito" class="btn btn-primary justify-content-center">Vaciar carrito</button>
                                </div>
                                
                            </div> `  
            templateCarrito.innerHTML = agregar;
            plantillaCarrito.appendChild(templateCarrito);
            agregarCamisetasStorageAlaVistaCarrito();
            carritoDesplegado = true ;
            botonBorrarItem();

    }else{
        plantillaCarrito.innerHTML = "";
        carritoCompras.innerHTML = "";
        carritoDesplegado = false;
    }}

});



formulario(document.getElementById("form"));



//Los datos del formulario guardarlos en algún lugar (array / objeto)


// ver diferencias entre for...of y for...in
// Preguntar si cuando obtenes un objeto obtenes los métodos. O cómo haces para obtener los métodos de un objeto?
/* Ver si el carrito de comrpas lo hacemos : por cada compra se guarda en local storage
y cuando quiero ver el carrito, lo obtengo desde ahí con json y lo muestro en pantalla.
O si lo hacemos como está hecho en el video del chabón que mandó el video el tutor.

//Arreglar el recorrido de las camisetas en el boton comprar. Recorre TODAS las camisetas. No es eficiente

Agregar algún filtro para buscar
*/
