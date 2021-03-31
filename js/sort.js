function sortShirts(){
    const sort = document.getElementById("sort");
    sort.onchange = function(){
        let sortSelection = sort.value;
        if(sortSelection === '1'){
            stockCamisetas.sort((a,b) => a.devolverClub().localeCompare(b.devolverClub()));
        }else if (sortSelection === '2'){
            stockCamisetas.sort((a,b) => a.devolverClub().localeCompare(b.devolverClub())).reverse();
        }else if (sortSelection === '3'){
            stockCamisetas.sort((a,b) => a.devolverPrecio() - b.devolverPrecio());
        }else if(sortSelection === '4'){
            stockCamisetas.sort((a,b) => b.devolverPrecio() - a.devolverPrecio());
        }else if(sortSelection === '5'){
            stockCamisetas.sort((a,b) => b.devolverPais() - a.devolverPais());
        }
        $('#listShirts').html("");
        showAllShirtsEvent();
    }
    
}



