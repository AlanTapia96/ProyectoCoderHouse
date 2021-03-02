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

    vender(){
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

    devolverPais(){
        return this.pais;
    }
}