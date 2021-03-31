$(document).ready(function(){

    function bienvenida() {
        if(localStorage.getItem("nombre") == null){
            localStorage.setItem("nombre",prompt("Por favor, ingrese su nombre"));
        }
        
        let welcome = document.getElementById("welcome");
        let names = localStorage.getItem("nombre");
        welcome.innerHTML = `¡Bienvenido/a, ${names}!`;
        $('.div-welcome').fadeIn('slow');
    }

    /* Función para crear todos los objetos*/
    function instanciarCamisetas(stock,cantidad){
        for (const pais in variedadCamisetas) {
            let listaPais = variedadCamisetas[pais];
            for (let i=0; i<listaPais.length;i++){
                let camiseta = listaPais[i];
                let nuevaCamiseta = new Camiseta(camiseta,pais,cantidad);
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
            $('#contacto').append("<div id='success' class='position-relative'></div>");
            
            gsap.from('#success',{
                y: -80,
            })
            $('#success').html("<div class='text-center mt-2'><h3 class=''>¡Formulario enviado con éxito!</h3></div>")
            gsap.to('#success',{
                duration: 1,
                y: 5,
                ease: 'none'
            })    
        });
        
    }



    function generarCamisetasEvento(id,variedadCamisetas){ 
        let padre = document.getElementById("camisetas");
        let html = '';
        for (const camisetaPais in variedadCamisetas) {
            if (camisetaPais == id){
                let listaPais = variedadCamisetas[camisetaPais];
                for(let i=0; i<listaPais.length;i++){
                    camiseta = listaPais[i];
                    console.log(camiseta);
                    html += renderCamisetas(camiseta);
                    }
                }
            }
        padre.innerHTML = html;
        elegirTalle();
        }


        for (const idPais in variedadCamisetas) {
            let clickPais = document.getElementById(idPais);
            clickPais.onclick = () => generarCamisetasEvento(idPais,variedadCamisetas,stockCamisetas);
        }
        
        
        $('#btnCarrito').click(function(){
            $('#carrito').toggle("slow",verCarrito);
        });


        $('#buttonAllShirts').click(function(){
            $('#showAllShirts').toggle("slow",showAllShirtsEvent);

        });

        $('#buttonCountries').click(function(){
            $('#paises').toggle("slow",showAllShirtsEvent);

        });

        
        

        




    /******************************** API Provincias/Municipios *************************************** */

    const url_provincias = "https://apis.datos.gob.ar/georef/api/provincias";

    $.get(url_provincias, function(respuesta,estado) {
            if(estado === "success"){
                let provinciasApi = respuesta.provincias;
                let provincias = document.getElementById("provincias");
                let provinciasHTML = "<option disabled selected value=''>Selecciona una provincia</option>";
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
                            let municipiosHTML =  "<option disabled selected value=''>Selecciona un municipio</option>";
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

    instanciarCamisetas(stockCamisetas,20);
    bienvenida();
    buscador();
    carritoDeCompras = obtenerCarritoStorage();
    cantidadCarrito = obtenerCantidadStorage();
    importeTotal = obtenerImporteStorage();
    formulario();
});

/*Función global para ser reconocida por buscador.js*/

function renderCamisetas(camiseta){
    
    let html =  `<div class="card card-camiseta my-3 mr-2">
                <div class="card-body d-flex align-items-center flex-column">
                    <div class="h4-card">
                        <h4 class="card-text camiseta text-center">${camiseta}</h4>
                    </div>`
                    if(camiseta.includes(" ")){
                        camiseta = camiseta.replace(" ", "");
                    }
        html+=    `<div class="img-card">
                        <img class="img-fluid img" src="${imagenes[camiseta]}">
                    </div>
                    <div class="talles-card">
                        <button id="XS ${camiseta}" class="btn talle btn-dark">XS</button>
                        <button id="S ${camiseta}" class="btn talle btn-dark">S</button>
                        <button id="M ${camiseta}" class="btn talle btn-dark">M</button>
                        <button id="L $ {camiseta}" class="btn talle btn-dark">L</button>
                        <button id="XL ${camiseta}" class="btn talle btn-dark">XL</button>
                    </div>
                    <div class="precio-card text-center">
                        <h4 class="precio">${stockCamisetas.find(cam => cam.devolverClub().replace(" ", "") == camiseta).devolverPrecio()}</h4>
                        <button disabled class="btn btn-secondary buy">Comprar</button> 
                    </div>  
                </div>
            </div>`
    return html;
}

//<h4 class="precio">${stockCamisetas.find(cam => cam.devolverClub().replace(" ", "") == camiseta).devolverPrecio()}</h4>

function showAllShirtsEvent(){
    const all = document.getElementById("listShirts");
    html = "<div id='total' class='d-flex justify-content-center flex-wrap container'>";
    for (const shirt of stockCamisetas) {
        shirtToShow = shirt.devolverClub();
        html += renderCamisetas(shirtToShow);
    }
    html += "</div>"
    all.innerHTML += html;
    elegirTalle();
    sortShirts();
    
    };

//Los datos del formulario guardarlos en algún lugar (array / objeto)

//Arreglar el recorrido de las camisetas en el boton comprar. Recorre TODAS las camisetas. No es eficiente

