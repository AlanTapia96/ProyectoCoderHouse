
function buscador(){
    submit = document.getElementById('search').
    addEventListener("submit",(e)=>{
        e.preventDefault();
        busqueda = document.getElementById('input-search').value;
        let long = document.getElementById("result").innerHTML.length;
        if(busqueda.length < 1 && long<=8){
            alert("Debe ingresar al menos un caracter");
        }else{
            html = "<div class='d-flex justify-content-center flex-row flex-wrap mt-5'>";
            if(busqueda.length>0){
                let listaString = busqueda.split(" ");
                for (let i = 0; i < listaString.length; i++) {
                    let primeraLetra = listaString[i].substring(0,1).toUpperCase();
                    listaString[i] = listaString[i].replace(listaString[i][0],primeraLetra);
                }
                busqueda = listaString.join(" ");
                
                listaMap = stockCamisetas.filter(x => x.devolverClub().includes(busqueda));
                result = document.getElementById("result");
               
                if(listaMap.length > 0){
                    for (const camisetaObj of listaMap) {
                        camiseta = camisetaObj.devolverClub();
                        html += renderCamisetas(camiseta);
                    }
                }else{
                    html += `<h4>No se encontró ninguna camiseta</h4>`
                }
                let buttonOcult = `<button class="btn btn-dark h-25 mt-3" id="ocultSearch">Ocultar Búsqueda</button>`;
                html += `${buttonOcult}</div>`
                result.innerHTML = html;                
                elegirTalle(); 

                $('#ocultSearch').click(function (e) { 
                    $('#result').html("");
                });

                }else{
                    html += `<h4>No se encontró ninguna camiseta</h4>`;
                    result.innerHTML = html;  
                }
            } 
});
    
}

