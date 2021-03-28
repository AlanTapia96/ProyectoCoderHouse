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



// function compare(attr, obj1, obj2) {
//     return obj1[attr].localeCompare(obj2[attr]);
//  }
 
// function generaComparador(attr) {
//    return function (a,b) {
//       return compare(attr,a,b);
//    }
// }



