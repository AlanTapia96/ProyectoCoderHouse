function sortShirts(){
    const sort = document.getElementById("sort");
    sort.onchange = function(){
        let sortSelection = sort.value;
        if(sortSelection === '2'){
            stockCamisetas.sort((a,b) => a.devolverClub().localeCompare(b.devolverClub()));
            $('#listShirts').html("");
            showAllShirtsEvent();
        }else if (sortSelection === '3'){
            stockCamisetas.sort((a,b) => a.devolverClub().localeCompare(b.devolverClub()));
        }
    }
}



